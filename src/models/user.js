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
        maxlength: [12, 'Senha deve ter até 12 caracteres'],
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
    /*if (validator.isEmail('this.getUpdate().$set.email'))
        throw {
            "Mensagem": "Erro ao cadastrar o usuario",
            "Data": {
                "errors": {
                    "email": {
                        "message": "Email inválido",
                        "name": "ValidatorError",
                        "properties": {
                            "message": "Email inválido",
                            "type": "user defined",
                            "path": "email",
                            "value": this.getUpdate().$set.email
                        },
                        "kind": "user defined",
                        "path": "email",
                        "value": this.getUpdate().$set.email
                    }
                },
                "_message": "User validation failed",
                "message": "User validation failed: email: Email inválido",
                "name": "ValidationError"
            }
        }*/
    if (this.getUpdate().$set.senha.length <= 6 || this.getUpdate().$set.senha.length > 12)
        throw {
            "Mensagem": "Erro ao cadastrar o usuario",
            "Data": {
                "errors": {
                    "senha": {
                        "message": "Senha deve ter até 12 caracteres ou ser menor que 6 caracteres",
                        "name": "ValidatorError",
                        "properties": {
                            "message": "Senha deve ter até 12 caracteres ou ser menor que 6 caracteres",
                            "type": "maxlength",
                            "maxlength": 12,
                            "path": "senha",
                            "value": ""
                        },
                        "kind": "maxlength",
                        "path": "senha",
                        "value": ""
                    }
                },
                "_message": "User validation failed",
                "message": "Senha deve ter até 12 caracteres ou ser menor que 6 caracteres",
                "name": "ValidationError"
            }
        };
    const hash = await bcryptjs.hash(this.getUpdate().$set.senha, 10);
    this.getUpdate().$set.senha = hash;
});

module.exports = mongoose.model("User", schema);
