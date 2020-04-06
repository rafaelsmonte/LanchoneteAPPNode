const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require('dotenv').config();



function gerarToken(user = {}) {
  return jwt.sign({ id: user.id }, process.env.SECRET,
    {
      expiresIn: 86400,
    });
}
exports.get = (req, res, next) => {
  User
    .find()
    .then(data => {
      res.status(201).send(data);
    })
    .catch(e => {
      res.status(400).send({
        Mensagem: "Erro ao listar  os usuarios",
        Data: e
      });
    });
};
exports.post = (req, res, next) => {
  var user = new User(req.body);
  user
    .save()
    .then(x => {
      res.status(201)
        .send({
          user,
          token: gerarToken({ user: user }),
        });
    })
    .catch(e => {
      res.status(400).send({
        Mensagem: "Erro ao cadastrar o usuario",
        Data: e
      });
    });
};
exports.auth = async (req, res, next) => {
  const { login, senha } = req.body;
  const user = await User.findOne({ login } || "").select('+senha')
    .catch(e => {
      res.status(400).send({
        Mensagem: "Erro ao autenticar o usuário",
        Data: e
      });
    });
  if (!user)
    return res.status(400).send({ error: "Usuario não encontrado" });
  if (!await bcryptjs.compare(senha || "", user.senha))
    return res.status(400).send({ error: "Senha inválida" });

  user.senha = undefined;

  return res.status(200).send({ user, token: gerarToken({ user: user }) });
};

exports.atualizaToken = async (req, res, next) => {
  const { login } = req.body;

  const user = await User.findOne({ login } || "")
    .catch(e => {
      res.status(400).send({
        Mensagem: "Erro ao encontrar o usuário",
        Data: e
      });
    });
  if (!user)
    return res.status(400).send({ error: "Erro ao encontrar o usuário" });
  return res.status(200).send({ user, token: gerarToken({ user: user }) });
};

exports.enviaEmailConfirmacao = async (req, res, next) => {
  const { login, email } = req.body;
  if (!login || !email)
    return res.status(400).send({ error: "Login ou Email não informados" });
  const user = await User.findOne({ login, email })
    .catch(e => {
      res.status(400).send({
        error: e
      });
    });
  if (!user)
    return res.status(400).send({ error: "Usuário não encontrado" });

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_EMAIL,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SENHA_EMAIL
    }
  });

  const conteudoEmail = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset de Senha",
    text: "Mensagem automatica de reset de senha"
  };
  transporter.sendMail(conteudoEmail, (err) => {
    if (err)
      return res.status(400).send({ error: "Erro ao enviar o email de confirmação" });
  });
  return res.status(200).send({Mensagem: "Mensagem enviada com sucesso"});
  /*var d1 = new Date();
d1.setMinutes(d1.getMinutes()+30);
d1 = new Date(d1);
console.log(d1);*/
};







