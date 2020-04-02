const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

function gerarToken(user = {}) {
  return jwt.sign({ id: user.id }, authConfig.secret,
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
}

/*
const user = await User.find({ login, token } || "")
.catch(e => {
res.status(400).send({
Mensagem: "Erro ao encontrar o usuário",
Data: e
});
});
if (!user)
return res.status(400).send({ error: "Erro ao encontrar o usuário" });
user.update({ login, token } || "", { $set: { token: gerarToken({ user: user }) } });
}
*/




