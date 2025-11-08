const yup = require('yup');

exports.create = yup.object({
  nome: yup.string().required(),
  descricao: yup.string().required()
});

exports.update = yup.object({
  nome: yup.string(),
  descricao: yup.string()
});
