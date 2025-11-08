const express = require('express');
const router = express.Router();
const Funcionario = require('../models/FuncionarioModel');
const Cargo = require('../models/CargoModel');
const Departamento = require('../models/DepartamentoModel');
const { create, update } = require('../validators/FuncionarioValidator');

router.post('/', async (req, res) => {
  try {
    await create.validate(req.body, { abortEarly: false });

    const { cargo, departamento } = req.body;
    const cargoExiste = await Cargo.findById(cargo);
    const deptoExiste = await Departamento.findById(departamento);

    if (!cargoExiste) return res.status(404).json({ erro: 'Cargo não encontrado' });
    if (!deptoExiste) return res.status(404).json({ erro: 'Departamento não encontrado' });

    const novo = await Funcionario.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erros: err.errors || err.message });
  }
});

router.get('/', async (_, res) => {
  const lista = await Funcionario.find().populate(['cargo', 'departamento']);
  res.json(lista);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Funcionario.findById(req.params.id).populate(['cargo', 'departamento']);
    if (!item) return res.status(404).json({ erro: 'Funcionário não encontrado' });
    res.json(item);
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await update.validate(req.body, { abortEarly: false });
    const atualizado = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erros: err.errors || err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Funcionario.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Funcionário removido com sucesso' });
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
});

module.exports = router;
