const mongoose = require ('mongoose')

const schema = new mongoose.Schema (
    )
     nome: { type: String, required: true },
     descrição: { type: String, required: true }
}
)

const Departamento = mongoose.model ('Departamento', schema)