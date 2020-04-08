"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    dataExpiracao: {
        type: Date,
        default: Date.now,
    },
    login:{
        type: String,
        required: [true, 'Login deve ser informado'],
        trim: true,
        lowercase: true,
    }
});

schema.index({ dataExpiracao: 1 }, { expireAfterSeconds : 120 });
 
module.exports = mongoose.model("TokenResetSenha", schema);
