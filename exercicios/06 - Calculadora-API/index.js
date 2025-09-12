const express = require('express');
const app = express();
const port = 3000;

// importa o router da calculadora
const calculadoraRouter = require('./routes/calculadora');

// registra o router
app.use('/calculadora', calculadoraRouter);

// rota inicial só para teste
app.get('/', (req, res) => {
  res.send('API Calculadora Express funcionando!');
});

// inicia servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});