const express = require('express');
const router = express.Router();
const Tarefa = require('../models/TarefaModel');
const Funcionario = require('../models/FuncionarioModel');
const Projeto = require('../models/ProjetoModel');
const { create, update } = require('../validators/TarefaValidator');

router.post('/', async (req, res) => {
  try {
    await create.validate(req.body, { abortEarly: false });

    const { responsavel, projeto } = req.body;
    const funcExiste = await Funcionario.findById(responsavel);
    const projExiste = await Projeto.findById(projeto);

    if (!funcExiste) return res.status(404).json({ erro: 'Funcionário não encontrado' });
    if (!projExiste) return res.status(404).json({ erro: 'Projeto não encontrado' });

    const novo = await Tarefa.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erros: err.errors || err.message });
  }
});

router.get('/', async (_, res) => {
  const lista = await Tarefa.find().populate(['responsavel', 'projeto']);
  res.json(lista);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Tarefa.findById(req.params.id).populate(['responsavel', 'projeto']);
    if (!item) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(item);
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await update.validate(req.body, { abortEarly: false });
    const atualizado = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erros: err.errors || err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Tarefa removida com sucesso' });
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

module.exports = router;
