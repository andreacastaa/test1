const mongoose = require('mongoose');

const prenotazioneSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  supermercato: { type: mongoose.Schema.Types.ObjectId, ref: 'Supermercato', required: true },
  prodotti: [{
    codice: String,
    descrizione: String,
    prezzo: Number
  }],
  costoTotale: { type: Number, required: true },
  fasciaOrariaRitiro: { type: String, required: true },
  dataPrenotazione: { type: Date, default: Date.now },
  codicePrenotazione: { type: String, required: true }
});

module.exports = mongoose.model('Prenotazione', prenotazioneSchema);
