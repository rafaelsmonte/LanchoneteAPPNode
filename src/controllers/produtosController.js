const mongoose = require("mongoose");
const Produto = mongoose.model("Produto");

exports.post = (req, res, next) => {
  var produto = new Produto(req.body);
  produto
    .save()
    .then(x => {
      res.status(201).send({ Mensagem: "Produto cadastrado com sucesso" });
    })
    .catch(e => {
      res.status(400).send({
        Mensagem: "Erro ao cadastrar o produto",
        Data: e
      });
    });
};
exports.get = (req, res, next) => {
  res.status(200).send({
    Nome: "XSalada",
    Preço: 10
  });
};

