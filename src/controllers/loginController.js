const mongoose = require("mongoose");
const Produto = mongoose.model("Produto");

exports.get = (req, res, next) => {
    res.status(200).send({
        Login: req.Login,
        Senha: res.Senha
      });

};