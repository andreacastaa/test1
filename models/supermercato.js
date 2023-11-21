const mongoose = require('mongoose');

const supermercatoSchema = new mongoose.Schema({
  denominazione: { type: String, required: true },
  indirizzo: { type: String, required: true },
  tipologia: { type: String, required: true, enum: ['mini-market', 'market', 'megastore'] }
});

module.exports = mongoose.model('Supermercato', supermercatoSchema);
