const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db'); // Importa la funzione di connessione

const app = express();
const supermercatiRouter = require('./routes/supermercati');
const prenotazioniRouter = require('./routes/prenotazioni');
const clientiRouter = require('./routes/clienti');
const prodottiRouter = require('./routes/prodotti');
const verificaToken = require('./middleware');
// Connessione al database
connectDB();

app.use(cors());
app.use(bodyParser.json());



// Definisci altre rotte qui
app.use('/api/clienti', clientiRouter);
app.use('/api/supermercati', supermercatiRouter);
app.use('/api/prenotazioni', verificaToken, prenotazioniRouter);
app.use('/api/prodotti', prodottiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
