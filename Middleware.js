const jwt = require('jsonwebtoken');

function verificaToken(req, res, next) {
  // Ottieni il token dall'header della richiesta

  const token = req.headers['authorization'].split(' ')[1];
console.log(token);
  if (!token) {
    return res.status(401).send('Token mancante');
  }

  // Verifica il token
  jwt.verify(token, 'Segreto', (err, decoded) => {
    if (err) {
      return res.status(403).send('Token non valido');
    }
console.log(decoded);
    // Imposta l'utente nel request object
    req.user = decoded;
    next();
  });
}

module.exports = verificaToken;