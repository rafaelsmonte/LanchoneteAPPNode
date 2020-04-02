"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  descricao: {
    type: String,
    required: [true,'Descrição deve ser informada'],
    trim: true,
    
  
  },
  descricaoCurta: {
    type: String,
    required: [true,'Descrição curta deve ser informada'],
    trim: true
  },
  preco: {
    type: Number,
    required: [true,'Preço deve ser indormado']

  },
  slug: {
    type: String,
    required: [true,'Slug deve ser informado'],
    index: true,
    unique: true
  },
  ativo:{
    type: Boolean,
    required: true,
    default: true
  }

});

module.exports = mongoose.model("Produto", schema);

