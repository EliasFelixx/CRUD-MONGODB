const express = require('express');
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Tool = require('../models/Tool');
const router = express.Router();

// Criar reserva
router.post('/', async (req, res) => {
  try {
    const { usuarioId, ferramentaId, dataInicio, dataFim, observacoes } = req.body;
    
    // Buscar dados do usuário e ferramenta
    const usuario = await User.findById(usuarioId).select('-senha');
    const ferramenta = await Tool.findById(ferramentaId);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    if (!ferramenta) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }
    
    if (!ferramenta.disponivel) {
      return res.status(400).json({ error: 'Ferramenta não disponível' });
    }
    
    // Calcular valor total (em dias)
    const dias = Math.ceil((new Date(dataFim) - new Date(dataInicio)) / (1000 * 60 * 60 * 24));
    const valorTotal = dias * ferramenta.preco;
    
    // Criar reserva com dados completos
    const reservation = new Reservation({
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone
      },
      ferramenta: {
        id: ferramenta._id,
        nome: ferramenta.nome,
        categoria: ferramenta.categoria,
        marca: ferramenta.marca,
        modelo: ferramenta.modelo,
        preco: ferramenta.preco,
        descricao: ferramenta.descricao,
        especificacoes: ferramenta.especificacoes
      },
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim),
      valorTotal,
      observacoes
    });
    
    await reservation.save();
    
    // Marcar ferramenta como indisponível
    await Tool.findByIdAndUpdate(ferramentaId, { disponivel: false });
    
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todas as reservas
router.get('/', async (req, res) => {
  try {
    const { status, usuarioId } = req.query;
    const filtros = {};
    
    if (status) filtros.status = status;
    if (usuarioId) filtros['usuario.id'] = usuarioId;
    
    const reservations = await Reservation.find(filtros).sort({ dataCriacao: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar reservas de um usuário específico
router.get('/usuario/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ 'usuario.id': req.params.userId })
      .sort({ dataCriacao: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar reserva por ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar status da reserva
router.put('/:id', async (req, res) => {
  try {
    const { status, observacoes } = req.body;
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    
    // Se mudar para Concluída ou Cancelada, liberar ferramenta
    if ((status === 'Concluída' || status === 'Cancelada') && reservation.status === 'Ativa') {
      await Tool.findByIdAndUpdate(reservation.ferramenta.id, { disponivel: true });
    }
    
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status, observacoes },
      { new: true, runValidators: true }
    );
    
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar reserva
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    
    // Se reserva ativa, liberar ferramenta
    if (reservation.status === 'Ativa') {
      await Tool.findByIdAndUpdate(reservation.ferramenta.id, { disponivel: true });
    }
    
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reserva deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
