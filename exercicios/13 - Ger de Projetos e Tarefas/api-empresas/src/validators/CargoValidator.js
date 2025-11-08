const yup = require('yup');

exports.create = yup.object({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  salario: yup.number().required().min(1518, 'O salário mínimo é R$ 1.518,00')
});

exports.update = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
  salario: yup.number().min(1518, 'O salário mínimo é R$ 1.518,00')
});
