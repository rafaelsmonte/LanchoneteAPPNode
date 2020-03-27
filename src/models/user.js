"use strict";
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome deve ser informado'],
    },

    login: {
        type: String,
        required: [true, 'Login deve ser informado'],
        trim: true,
        lowercase: true,
        unique: [true, 'Login existente'],
    },
    senha: {
        type: String,
        required: [true, 'Senha deve ser informada'],
        trim: true,
        select: false,
    },
    dataCriacao: {
        type: Date,
        default: Date.now,
    }


});
schema.pre('save', async function(next)
{
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
});
module.exports = mongoose.model("User", schema);
