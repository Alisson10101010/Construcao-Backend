const yup = require('yup');
const mongoose = require('mongoose');

exports.create = yup.object({
  titulo: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup.date().required().min(
    yup.ref('data_inicio'),
    'A data final deve ser posterior à data inicial'
  ),
  responsavel: yup.string().required().test('valid-id', 'ID de funcionário inválido', val => mongoose.Types.ObjectId.isValid(val)),
  projeto: yup.string().required().test('valid-id', 'ID de projeto inválido', val => mongoose.Types.ObjectId.isValid(val))
});

exports.update = yup.object({
  titulo: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().min(
    yup.ref('data_inicio'),
    'A data final deve ser posterior à data inicial'
  ),
  responsavel: yup.string().test('valid-id', 'ID de funcionário inválido', val => !val || mongoose.Types.ObjectId.isValid(val)),
  projeto: yup.string().test('valid-id', 'ID de projeto inválido', val => !val || mongoose.Types.ObjectId.isValid(val))
});
