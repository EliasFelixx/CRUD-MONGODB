const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar modelos
const User = require('./models/User');
const Tool = require('./models/Tool');
const Reservation = require('./models/Reservation');

// Rotas
app.use('/api/users', require('./routes/users'));
app.use('/api/tools', require('./routes/tools'));
app.use('/api/reservations', require('./routes/reservations'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API da Plataforma de Aluguel de Ferramentas' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
