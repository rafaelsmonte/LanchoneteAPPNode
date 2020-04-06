"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    dataExpiracao: {
        type: Date,
        default: Date.now.add(30,'minutes'),
    }
});


module.exports = mongoose.model("ResetSenha", schema);
