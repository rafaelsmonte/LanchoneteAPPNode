'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const app = express();
//Conectar Banco
var url =
    "mongodb+srv://rafael:rafael@lanchoneteapp-xocup.gcp.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.Promise = global.Promise;
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