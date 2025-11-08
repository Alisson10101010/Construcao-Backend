const express = require('express');
const router = express.Router();
const Departamento = require('../models/DepartamentoModel');
const { create, update } = require('../validators/DepartamentoValidator');

router.post('/', async (req, res) => {
  try {
    await create.validate(req.body, { abortEarly: false });
    const novo = await Departamento.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erros: err.errors || err.message });
  }
});

router.get('/', async (_, res) => {
  const lista = await Departamento.find();
  res.json(lista);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Departamento.findById(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Departamento não encontrado' });
    res.json(item);
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await update.validate(req.body, { abortEarly: false });
    const atualizado = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erros: err.errors || err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Departamento.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Departamento removido com sucesso' });
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

module.exports = router;
