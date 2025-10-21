require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 🔹 Variáveis do .env
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// 🔹 String de conexão (CORRIGIDA: apenas um "@")
const url = process.env.DB_URI ||
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(erro => console.log("❌ Erro ao conectar no MongoDB:", erro));

// 🔹 Model (Collection: Livros)
const LivroModel = mongoose.model('Livros', new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true },
  criadoEm: { type: Date, default: Date.now }
}));

// --- ROTAS CRUD ---

// Health-check
app.get('/', (req, res) => {
  res.json({ status: 'ok', msg: 'API de Livros funcionando 🚀' });
});

// CREATE - POST /livros
app.post('/livros', async (req, res) => {
  try {
    const livro = req.body;
    if (!livro.titulo || !livro.autor || !livro.editora || livro.ano === undefined || livro.preco === undefined) {
      return res.status(400).json({ erro: "Campos obrigatórios: titulo, autor, editora, ano, preco" });
    }
    const criado = await LivroModel.create(livro);
    res.status(201).json(criado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar livro' });
  }
});

// READ ALL - GET /livros
app.get('/livros', async (req, res) => {
  try {
    const { autor, editora, page = 1, limit = 0 } = req.query;
    const filtros = {};
    if (autor) filtros.autor = autor;
    if (editora) filtros.editora = editora;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 0;

    const query = LivroModel.find(filtros).sort({ criadoEm: -1 });
    if (limitNum > 0) query.skip((pageNum - 1) * limitNum).limit(limitNum);

    const livros = await query.exec();
    res.json(livros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar livros' });
  }
});

// READ ONE - GET /livros/:id
app.get('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ erro: 'ID inválido' });
    const livro = await LivroModel.findById(id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar livro' });
  }
});

// UPDATE - PUT /livros/:id
app.put('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ erro: 'ID inválido' });

    const atualizado = await LivroModel.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
    if (!atualizado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(atualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar livro' });
  }
});

// DELETE - DELETE /livros/:id
app.delete('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ erro: 'ID inválido' });
    const removido = await LivroModel.findByIdAndDelete(id);
    if (!removido) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json({ mensagem: 'Livro removido com sucesso', removido });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover livro' });
  }
});

// 🔹 Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Aplicação rodando em http://localhost:${PORT}`);
});
