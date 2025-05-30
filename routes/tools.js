const express = require('express');
const Tool = require('../models/Tool');
const router = express.Router();

// Criar ferramenta
router.post('/', async (req, res) => {
  try {
    const tool = new Tool(req.body);
    await tool.save();
    res.status(201).json(tool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar ferramentas
router.get('/', async (req, res) => {
  try {
    const { categoria, disponivel, marca } = req.query;
    const filtros = {};
    
    if (categoria) filtros.categoria = categoria;
    if (disponivel !== undefined) filtros.disponivel = disponivel === 'true';
    if (marca) filtros.marca = new RegExp(marca, 'i');
    
    const tools = await Tool.find(filtros);
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar ferramenta por ID
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }
    res.json(tool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar ferramenta
router.put('/:id', async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tool) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }
    res.json(tool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar ferramenta
router.delete('/:id', async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }
    res.json({ message: 'Ferramenta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
