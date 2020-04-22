"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();
//Conectar Banco
mongoose
  .connect(process.env.URL_BANCO, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("conectado!!");
  })
  .catch(err => {
    console.log(err);
  });

//controller
const Produto = require("./models/produto");
const User = require("./models/user");
const TokenResetSenha = require("./models/tokenResetSenha");
const Mesa = require("./models/mesa");

//Rotas
const rotaIndex = require("./routes/rotaTeste");
const rotaProdutos = require("./routes/rotaProdutos");
const rotaLogin = require("./routes/rotaUser");
const rotaMesa = require("./routes/rotaMesa");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use("/", rotaIndex);
app.use("/Produto", rotaProdutos);
app.use("/User", rotaLogin);
app.use("/Mesa", rotaMesa);

module.exports = app;
