const express = require('express');
const router = express.Router();
const Supermercato = require('../models/supermercato');

// Crea un nuovo supermercato
router.post('/', async (req, res) => {
  try {
    const nuovoSupermercato = new Supermercato(req.body);
    const salvato = await nuovoSupermercato.save();
    res.status(201).send(salvato);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Leggi tutti i supermercati
router.get('/', async (req, res) => {
  try {
    const supermercati = await Supermercato.find();
    res.status(200).send(supermercati);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Aggiorna un supermercato
router.patch('/:id', async (req, res) => {
  try {
    const supermercato = await Supermercato.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supermercato) {
      return res.status(404).send();
    }
    res.send(supermercato);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Elimina un supermercato
router.delete('/:id', async (req, res) => {
  try {
    const supermercato = await Supermercato.findByIdAndDelete(req.params.id);
    if (!supermercato) {
      return res.status(404).send();
    }
    res.send(supermercato);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
