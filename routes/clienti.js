const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Cliente = require('../models/cliente');

// Crea un nuovo cliente
router.post('/', async (req, res) => {
    try {
      // Controlla se esiste già un cliente con lo stesso codice fiscale
      const clienteEsistente = await Cliente.findOne({ codiceFiscale: req.body.codiceFiscale });
      if (clienteEsistente) {
        return res.status(400).send('Cliente con questo codice fiscale già registrato');
      }

      // Hash della password
      const hashedPassword = await bcrypt.hash(req.body.password, 8);

      // Se non esiste, crea un nuovo cliente con la password hashata
      const nuovoCliente = new Cliente({
        ...req.body,
        password: hashedPassword
      });
      const salvato = await nuovoCliente.save();
      res.status(201).send(salvato);
    } catch (err) {
      res.status(400).send(err);
    }
});
  

// Login di un cliente
router.post('/login', async (req, res) => {
    try {
      // Trova l'utente basandosi sul codice fiscale
      const user = await Cliente.findOne({ codiceFiscale: req.body.codiceFiscale });
      if (user && await bcrypt.compare(req.body.password, user.password)) {
        // Se la password corrisponde, genera un token JWT
        const token = jwt.sign({ userId: user._id }, 'Segreto', { expiresIn: '24h' });
        res.json({ token });
      } else {
        // Se il codice fiscale o la password non corrispondono, invia un errore
        res.status(400).send('Credenziali non valide');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Leggi tutti i clienti
  router.get('/', async (req, res) => {
    try {
      const clienti = await Cliente.find();
      res.status(200).send(clienti);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Aggiorna un cliente
  router.patch('/:id', async (req, res) => {
    try {
      const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cliente) {
        return res.status(404).send();
      }
      res.send(cliente);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Elimina un cliente
  router.delete('/:id', async (req, res) => {
    try {
      const cliente = await Cliente.findByIdAndDelete(req.params.id);
      if (!cliente) {
        return res.status(404).send();
      }
      res.send(cliente);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

module.exports = router;
