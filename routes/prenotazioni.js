const express = require('express');
const router = express.Router();
const Prenotazione = require('../models/prenotazione');
const crypto = require('crypto');

// Crea una nuova prenotazione
router.post('/', async (req, res) => {
    try {
      let codiceUnico;
      let codiceEsistente = false;
      
      do {
        // Genera un codice alfanumerico unico
        codiceUnico = crypto.randomBytes(8).toString('hex');
  
        // Controlla se il codice esiste già
        const prenotazioneEsistente = await Prenotazione.findOne({ codicePrenotazione: codiceUnico });
        codiceEsistente = prenotazioneEsistente != null;
      } while (codiceEsistente);
  
      // Aggiungi il codice alla prenotazione
      const nuovaPrenotazione = new Prenotazione({
        ...req.body,
        codicePrenotazione: codiceUnico
      });
  
      // Salva la prenotazione
      const salvata = await nuovaPrenotazione.save();
      res.status(201).send({ prenotazione: salvata, codicePrenotazione: codiceUnico });
    } catch (err) {
      res.status(400).send(err);
    }
  });

// Leggi tutte le prenotazioni
router.get('/', async (req, res) => {
  try {
    const prenotazioni = await Prenotazione.find().populate('cliente').populate('supermercato');
    res.status(200).send(prenotazioni);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Aggiorna una prenotazione
router.patch('/:id', async (req, res) => {
  try {
    const prenotazione = await Prenotazione.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prenotazione) {
      return res.status(404).send();
    }
    res.send(prenotazione);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Elimina una prenotazione
router.delete('/:id', async (req, res) => {
    try {
      const prenotazione = await Prenotazione.findById(req.params.id);
  
      if (!prenotazione) {
        return res.status(404).send('Prenotazione non trovata');
      }
  
      // Controlla se la data corrente è almeno un giorno prima della data di prenotazione
      const dataCorrente = new Date();
      const dataPrenotazione = new Date(prenotazione.dataPrenotazione);
  
      // Calcola la differenza in giorni
      const differenzaGiorni = (dataPrenotazione - dataCorrente) / (1000 * 3600 * 24);
  
      if (differenzaGiorni < 1) {
        return res.status(400).send('Le prenotazioni possono essere annullate solo fino al giorno precedente');
      }
  
      // Procedi con la cancellazione
      await Prenotazione.findByIdAndDelete(req.params.id);
      res.send('Prenotazione annullata con successo');
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
