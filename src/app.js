'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const app = express();
//Conectar Banco
var url =
    "mongodb+srv://rafael:rafael@lanchoneteapp-xocup.gcp.mongodb.net/test?retryWrites=true&w=majority";

  mongoose
    .connect(url, {
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
const Produto = require('./models/produto');
const Login = require('./models/login');

//Rotas
const rotaIndex = require('./routes/rotaTeste');
const rotaProdutos = require('./routes/rotaProdutos');
const rotaLogin = require('../src/routes/rotaLogin');

app.use(bodyparser.json({
  limit: '5mb'
}));
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use('/',rotaIndex);
app.use('/Produtos',rotaProdutos);
app.use('/Login',rotaLogin);


module.exports = app;