const mongoose = require('mongoose');

const prodottoSchema = new mongoose.Schema({
  codice: { type: String, required: true, unique: true },
  descrizione: { type: String, required: true },
  prezzo: { type: Number, required: true }
});

module.exports = mongoose.model('Prodotto', prodottoSchema);
