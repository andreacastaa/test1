const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  dataDiNascita: { type: Date, required: true },
  codiceFiscale: { type: String, required: true },
  cellulare: { type: String, required: true },
  cartaIdentita: { type: String, required: true },
  citta: { type: String, required: true },
  indirizzo: { type: String, required: true },
  cap: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Cliente', clienteSchema);
