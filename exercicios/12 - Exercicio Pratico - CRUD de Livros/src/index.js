require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

// Importa o controller
const livroController = require('./controllers/LivroController')
app.use('/livros', livroController)

// Conexão com MongoDB Atlas
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro na conexão:', err))

// Inicia o servidor
app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'))
