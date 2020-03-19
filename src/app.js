'use strict'
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
//Rotas
const rotaIndex = require('../src/routes/rotateste')
const rotaPratos = require('../src/routes/rotapratos')
app.use('/',rotaIndex);
app.use('/Pratos',rotaPratos);
app.use('/Pratos/:id',rotaPratos);

module.exports = app;