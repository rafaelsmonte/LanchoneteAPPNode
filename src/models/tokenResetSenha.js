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
    },
    token:{
        type:String,
    }
});

schema.index({ dataExpiracao: 1 }, { expireAfterSeconds : 60*30 });
 
module.exports = mongoose.model("TokenResetSenha", schema);
