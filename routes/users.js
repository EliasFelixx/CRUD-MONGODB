const express = require('express');
const User = require('../models/User');
const Reservation = require('../models/Reservation'); // Adicionar import
const jwt = require('jsonwebtoken');
const router = express.Router();

// Criar usuário
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const { senha, ...userSemSenha } = user.toObject();
    res.status(201).json(userSemSenha);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(400).json({ error: error.message });
  }
});

// Listar usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-senha');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-senha');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-senha');
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // NOVA FUNCIONALIDADE: Atualizar dados do usuário em todas as reservas
    await Reservation.updateMany(
      { 'usuario.id': req.params.id },
      {
        $set: {
          'usuario.nome': user.nome,
          'usuario.email': user.email,
          'usuario.telefone': user.telefone
        }
      }
    );
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
