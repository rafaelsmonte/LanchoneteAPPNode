'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const mongoConfig = require('./config/mongoConfig');


const app = express();
//Conectar Banco
  mongoose
    .connect(mongoConfig.url, {
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
const User = require('./models/user');

//Rotas
const rotaIndex = require('./routes/rotaTeste');
const rotaProdutos = require('./routes/rotaProdutos');
const rotaLogin = require('./routes/rotaUser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use('/',rotaIndex);
app.use('/Produto',rotaProdutos);
app.use('/User',rotaLogin);


module.exports = app;