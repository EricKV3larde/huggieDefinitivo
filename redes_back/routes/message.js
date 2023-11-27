// messageRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../schema/message.js');
const { jsonResponse } = require('../lib/jsonResponse.js');

// Ruta para guardar un mensaje
router.post('/', async (req, res) => {
  const params = req.body;
  const message = new Message({
    message: params.message,
    from: params.from,
  });

  try {
    const messageStored = await message.save();

    if (!messageStored) {
      return res.status(404).json(jsonResponse(404, {
        error: 'Error al guardar el mensaje',
      }));
    }

    return res.status(200).json(jsonResponse(200, {
      status: 'Success',
      messageStored: '¡Sí se pudo!',
    }));
  } catch (error) {
    return res.status(500).json(jsonResponse(500, {
      error: 'Error al guardar el mensaje',
    }));
  }
});

// Ruta para obtener todos los mensajes
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find({}).sort('-_id').exec();

    if (!messages) {
      return res.status(404).json(jsonResponse(404, {
        status: 'Error',
        message: 'No hay mensajes que mostrar',
      }));
    }

    return res.status(200).json(jsonResponse(200, {
      status: 'success',
      messages: messages,
    }));
  } catch (error) {
    return res.status(500).json(jsonResponse(500, {
      status: 'Error',
      message: 'Error al extraer mensajes',
    }));
  }
});

module.exports = router;
