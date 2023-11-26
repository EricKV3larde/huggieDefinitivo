// messageRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Obtener todos los mensajes
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensajes', error });
  }
});

// Crear un nuevo mensaje
router.post('/', async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear un mensaje', error });
  }
});

// Otras rutas para editar, eliminar, obtener mensajes por ID, etc.

module.exports = router;
