const express = require('express');
const router = express.Router();

// Datos simulados (en lugar de una base de datos real)
let topics = [
  {
    id: 1,
    title: "Primer tema",
    content: "Contenido del primer tema",
    comments: [
      { id: 1, content: "Primer comentario" },
      { id: 2, content: "Segundo comentario" }
    ]
  }
];

// Obtener todos los temas
router.get("/", (req, res) => {
  res.json(topics);
});

// Crear un nuevo tema
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const newTopic = { id: topics.length + 1, title, content, comments: [] };
  topics.push(newTopic);
  res.status(201).json(newTopic);
});

// Añadir un comentario a un tema
router.post("/:id/comments", (req, res) => {
  const topicId = parseInt(req.params.id);
  const { content } = req.body;

  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    return res.status(404).json({ message: "Tema no encontrado" });
  }

  const newComment = { id: topic.comments.length + 1, content };
  topic.comments.push(newComment);

  res.status(201).json(newComment);
});

// Actualizar un tema
router.put("/:id", (req, res) => {
  const topicId = parseInt(req.params.id);
  const { title, content } = req.body;

  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    return res.status(404).json({ message: "Tema no encontrado" });
  }

  topic.title = title || topic.title;
  topic.content = content || topic.content;

  res.json(topic);
});

// Eliminar un tema
router.delete("/:id", (req, res) => {
  const topicId = parseInt(req.params.id);

  const topicIndex = topics.findIndex((t) => t.id === topicId);

  if (topicIndex === -1) {
    return res.status(404).json({ message: "Tema no encontrado" });
  }

  topics.splice(topicIndex, 1);

  res.json({ message: "Tema eliminado exitosamente" });
});

// Eliminar un comentario de un tema
router.delete("/:topicId/comments/:commentId", (req, res) => {
  const topicId = parseInt(req.params.topicId);
  const commentId = parseInt(req.params.commentId);

  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    return res.status(404).json({ message: "Tema no encontrado" });
  }

  const commentIndex = topic.comments.findIndex((c) => c.id === commentId);

  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comentario no encontrado" });
  }

  topic.comments.splice(commentIndex, 1);

  res.json({ message: "Comentario eliminado exitosamente" });
});

module.exports = router;
