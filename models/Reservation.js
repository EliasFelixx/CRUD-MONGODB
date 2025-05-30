const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  usuario: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    nome: String,
    email: String,
    telefone: String
  },
  ferramenta: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
      required: true
    },
    nome: String,
    categoria: String,
    marca: String,
    modelo: String,
    preco: Number,
    descricao: String,
    especificacoes: {
      voltagem: String,
      potencia: String,
      peso: String,
      dimensoes: String
    }
  },
  dataInicio: {
    type: Date,
    required: true
  },
  dataFim: {
    type: Date,
    required: true
  },
  valorTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Ativa', 'Concluída', 'Cancelada'],
    default: 'Ativa'
  },
  observacoes: String,
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
