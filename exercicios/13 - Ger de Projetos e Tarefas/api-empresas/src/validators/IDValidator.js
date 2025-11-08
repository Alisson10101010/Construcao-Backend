const mongoose = require('mongoose');
const yup = require('yup');

const IDValidator = yup.string().test('valid-id', 'ID inválido', (value) => mongoose.Types.ObjectId.isValid(value));

module.exports = IDValidator;
