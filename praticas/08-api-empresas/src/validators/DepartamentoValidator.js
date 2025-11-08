const yup = require('yup');

const schema = yup.object().shape(
    {
        nome: yup.string ()