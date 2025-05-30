const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Manual', 'Elétrica', 'Pneumática', 'Hidráulica', 'Medição']
  },
  descricao: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  modelo: String,
  preco: {
    type: Number,
    required: true,
    min: 0
  },
  disponivel: {
    type: Boolean,
    default: true
  },
  estado: {
    type: String,
    enum: ['Novo', 'Usado - Bom', 'Usado - Regular', 'Usado - Ruim'],
    default: 'Usado - Bom'
  },
  especificacoes: {
    voltagem: String,
    potencia: String,
    peso: String,
    dimensoes: String
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tool', toolSchema);
