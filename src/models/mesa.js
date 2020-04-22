"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    numeroMesa: {
        type: Number,
        required: [true, 'Numero da mesa é obrigatorio'],
    },
    dataDoPedido: {
        type: Date,
        default: Date.now,
    },
    observacao: {
        type: String,
    },

    dataPagamento: {
        type: Date,
    },
    pedidos:
        [{
            descricaoCurta: {
                type: String,
                required: [true, 'Descrição curta deve ser informada'],
                trim: true
            },
            preco: {
                type: Number,
                required: [true, 'Preço deve ser indormado']
            },
            quantidade:
            {
                type: Number,
                required: [true, 'Quantidade deve ser informada'],
            },
            garcon: {
                type: String,
                required: [true, 'Garçon deve ser informado'],
            }
        }]
})


module.exports = mongoose.model("Mesa", schema);
