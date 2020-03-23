"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    Login: {
        type: String,
        required: [true, 'Login deve ser informado'],
        trim: true,
    },
    Senha: {
        type: String,
        required: [true, 'Senha deve ser informada'],
        trim: true,
    }


});

module.exports = mongoose.model("Login", schema);
