const yup = require('yup');

exports.create = yup.object({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  data_inicio: yup.date().required(),
  data_fim: yup.date().required().min(
    yup.ref('data_inicio'),
    'A data final deve ser posterior à data inicial'
  )
});

exports.update = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().min(
    yup.ref('data_inicio'),
    'A data final deve ser posterior à data inicial'
  )
});
