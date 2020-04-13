"use strict";
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const Validador = require("validator");
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
        minlength: [6, 'Senha deve ter mais de 6 caracteres'],
    },
    dataCriacao: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: [true, 'Email deve ser informado'],
        trim: true,
        lowercase: true,
        unique: [true, 'Email existente'],
        validate: [Validador.isEmail, 'Email inválido'],

    }


});

schema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
});

schema.pre('updateOne', async function (next) {
    if (this.getUpdate().$set.senha) {
        const hash = await bcryptjs.hash(this.getUpdate().$set.senha, 10);
        this.getUpdate().$set.senha = hash;
    }
});

schema.pre('findOneAndUpdate', async function (next) {
    if (this.getUpdate().$set.senha) {
        const hash = await bcryptjs.hash(this.getUpdate().$set.senha, 10);
        this.getUpdate().$set.senha = hash;
    }
});


module.exports = mongoose.model("User", schema);
