const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Mesa = require("../models/mesa");


exports.post = async (req, res, next) => {
    const { numeroMesa } = req.body;
    const mesaExistente = await Mesa.findOne({ numeroMesa, dataPagamento: { $exists: false } })
        .catch(e => {
            return res.status(400).send({
                Mensagem: "Erro ao encontrar a mesa",
                Data: e
            });
        });
    if (mesaExistente)
        return res.status(400).send({
            Mensagem: "Já existe uma mesa em aberto com esse número",
            mesa: mesaExistente
        });

    const mesa = new Mesa(req.body);
    mesa.save()
        .then(x => {
            res.status(201)
                .send({
                    mesa
                });
        })
        .catch(e => {
            return res.status(400).send({
                Mensagem: "Erro ao cadastrar a mesa",
                Data: e
            });
        });
};
exports.get = (req, res, next) => {
    Mesa
        .find()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            return res.status(400).send({
                Mensagem: "Erro ao listar  as mesas",
                Data: e
            });
        });

};
exports.adicionarPedido = async (req, res, next) => {
    const { numeroMesa, pedido } = req.body;
    var error = [];
    if (!numeroMesa)
        error.push("Numero da mesa deve ser informado");
    if (!pedido.preco)
        error.push("preço do pedido deve ser informado");
    if (!pedido.descricaoCurta)
        error.push("Descrição do pedido deve ser informado");
    if (!pedido.quantidade)
        error.push("Quantidade do pedido deve ser informado");
    if (!pedido.garcon)
        error.push("Garcon responsavel pelo pedido deve ser informado");

    if (error.length > 0)
        res.status(400).send({ error: error });

    const mesaExistente = await Mesa.findOneAndUpdate(
        { numeroMesa, dataPagamento: { $exists: false } },
        { $push: { pedidos: pedido } },
        { new: true })
        .catch(e => {
            return res.status(400).send({
                Mensagem: "Erro ao encontrar a mesa",
                Data: e
            });
        });
    if (!mesaExistente)
        return res.status(400).send({
            Mensagem: "Não existe mesa em aberto com esse numero",
            mesa: mesaExistente
        });
    res.status(200).send({ Mensagem: "Pedido adicionado" });


};
exports.mesasAbertas = (req, res, next) => {
    Mesa.find({ dataPagamento: { $exists: false } })
        .then(data => {
            res.status(201).send(data);
        })
        .catch(e => {
            return res.status(400).send({
                Mensagem: "Erro ao listar as mesas em aberto",
                Data: e
            });
        });

};