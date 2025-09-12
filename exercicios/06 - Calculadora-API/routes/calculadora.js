const express = require('express');
const router = express.Router();

// /calculadora/somar?numA=10&numB=20
router.get('/somar', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  res.json({ resultado: numA + numB });
});

// /calculadora/subtrair?numA=30&numB=5
router.get('/subtrair', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  res.json({ resultado: numA - numB });
});

// /calculadora/multiplicar?numA=7&numB=6
router.get('/multiplicar', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  res.json({ resultado: numA * numB });
});

// /calculadora/dividir?numA=20&numB=4
router.get('/dividir', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);

  if (numB === 0) {
    return res.status(400).json({ erro: 'Divisão por zero não é permitida.' });
  }

  res.json({ resultado: numA / numB });
});

module.exports = router;