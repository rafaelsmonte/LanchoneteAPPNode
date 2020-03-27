const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs");

exports.get = (req, res, next) => {
  res.status(200).send(req.body);
};
exports.post = (req, res, next) => {
  var user = new User(req.body);
  user
    .save()
    .then(x => {
      res.status(201).send({ Mensagem: "Usuario cadastrado com sucesso" });
    })
    .catch(e => {
      res.status(400).send({
        Mensagem: "Erro ao cadastrar o usuario",
        Data: e
      });
    });
};
exports.auth = async (req,res,next) => {
  const {login, senha} = req.body;
  const user = User.findOne({login}).select('+senha');
  if (!user)
    return res.status(400).send({ error: "Usuario cadastrado com sucesso" });

  if (!await bcryptjs.compare(senha, req.senha))
    return res.status(400).send({ error: "Senha inválida" });

  return res.status(200).send({ user });
};


