const express = require('express');
const router = express.Router();
const Prodotto = require('../models/prodotto');
const verificaToken = require('../middleware');

// Crea un nuovo prodotto
router.post('/',verificaToken, async (req, res) => {
    try {
      // Controlla se esiste già un prodotto con lo stesso codice
      const prodottoEsistente = await Prodotto.findOne({ codice: req.body.codice });
      if (prodottoEsistente) {
        return res.status(400).send('Un prodotto con questo codice esiste già');
      }
  
      const nuovoProdotto = new Prodotto(req.body);
      const salvato = await nuovoProdotto.save();
      res.status(201).send(salvato);
    } catch (err) {
      res.status(400).send(err);
    }
  });

// Leggi tutti i prodotti
router.get('/', async (req, res) => {
  try {
    const prodotti = await Prodotto.find();
    res.status(200).send(prodotti);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Aggiorna un prodotto
router.patch('/:id', async (req, res) => {
  try {
    const prodotto = await Prodotto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prodotto) {
      return res.status(404).send('Prodotto non trovato');
    }
    res.send(prodotto);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Elimina un prodotto
router.delete('/:id', async (req, res) => {
  try {
    const prodotto = await Prodotto.findByIdAndDelete(req.params.id);
    if (!prodotto) {
      return res.status(404).send('Prodotto non trovato');
    }
    res.send('Prodotto eliminato con successo');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
