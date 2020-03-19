const mongoose = require("mongoose");

function conectar()
{
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
};

module.exports = conectar;
