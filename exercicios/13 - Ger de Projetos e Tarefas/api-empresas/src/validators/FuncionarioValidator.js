const yup = require('yup');
const mongoose = require('mongoose');

exports.create = yup.object({
  nome: yup.string().required(),
  cpf: yup.string().required(),
  email: yup.string().required().email('Formato de e-mail inválido'),
  telefone: yup.string().required(),
  data_contratacao: yup.date().required(),
  data_nascimento: yup.date().required(),
  genero: yup.string().required(),
  endereco: yup.object({
    cep: yup.string(),
    logradouro: yup.string(),
    numero: yup.string(),
    complemento: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    uf: yup.string()
  }),
  cargo: yup.string().required().test('valid-id', 'ID de cargo inválido', val => mongoose.Types.ObjectId.isValid(val)),
  departamento: yup.string().required().test('valid-id', 'ID de departamento inválido', val => mongoose.Types.ObjectId.isValid(val))
});

exports.update = yup.object({
  nome: yup.string(),
  cpf: yup.string(),
  email: yup.string().email('Formato de e-mail inválido'),
  telefone: yup.string(),
  data_contratacao: yup.date(),
  data_nascimento: yup.date(),
  genero: yup.string(),
  endereco: yup.object({
    cep: yup.string(),
    logradouro: yup.string(),
    numero: yup.string(),
    complemento: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    uf: yup.string()
  }),
  cargo: yup.string().test('valid-id', 'ID de cargo inválido', val => !val || mongoose.Types.ObjectId.isValid(val)),
  departamento: yup.string().test('valid-id', 'ID de departamento inválido', val => !val || mongoose.Types.ObjectId.isValid(val))
});
