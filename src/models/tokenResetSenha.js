"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const schema = new Schema({
    dataExpiracao: {
        type: Date,
        default: Date.now,
    },
    login: {
        type: String,
        required: [true, 'Login deve ser informado'],
        trim: true,
        lowercase: true,
    },
    token: {
        type: String,
        default: function () { 
            return randomString(6) 
        },
    }
});

schema.index({ dataExpiracao: 1 }, { expireAfterSeconds: 60 * 30 });

function randomString(tamanho) {
    var str = "";
    for (var i = 0; i < tamanho; i++) {
        var rand = Math.floor(Math.random() * 62);
        var charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48;
        str += String.fromCharCode(charCode);
    }
    return str;
}

module.exports = mongoose.model("TokenResetSenha", schema);
