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
  Produto
    .find()
    .then(data => {
      res.status(201).send(data);
    })
    .catch(e => {
      res.status(400).send({
        Mensagem: "Erro ao listar  os produtos",
        Data: e
      });
    });
};

exports.getById = (req, res, next) => {
  Produto.findOne(
    {
      _id:req.params.id
    }).then(data=> {
      res.status(200).send(data);
    }).catch(e=>{
      res.status(400).send({
        Mensagem: "Erro ao listar o produto",
        Data: e
      });
    });
};


