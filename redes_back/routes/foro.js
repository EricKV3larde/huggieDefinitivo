const express = require('express');
const topicSchema = require("../schema/coment.js");

const router = express.Router();



router.post("/", (req, res) => {
  const temaNuevo = topicSchema(req.body);//carar un nu tema foro

  temaNuevo
  .save()
  .then((data) => res.json(data))
  .catch((error)=> res.json({message: error}))
});

// Obtener todos los temas
router.get("/", async (req, res) => {
  try {
    const temas = await topicSchema.find();
    res.json(temas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener temas", error });
  }
});

// Obtener un tema por ID
router.get("/:id", async (req, res) => {
  try {
    const tema = await topicSchema.findById(req.params.id);
    if (!tema) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }
    res.json(tema);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tema", error });
  }
});

// Añadir un comentario a un tema
router.post("/:id/comments", async (req, res) => {
  const { content } = req.body;
  const temaId = req.params.id;

  try {
    const tema = await topicSchema.findById(temaId);
    if (!tema) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }

    tema.comments.push({ content });
    await tema.save();

    res.status(201).json(tema.comments[tema.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: "Error al añadir un comentario", error });
  }
});

// Editar un tema
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const temaId = req.params.id;

  try {
    const tema = await topicSchema.findById(temaId);
    if (!tema) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }

    tema.title = title || tema.title;
    tema.content = content || tema.content;

    await tema.save();

    res.json(tema);
  } catch (error) {
    res.status(500).json({ message: "Error al editar el tema", error });
  }
});

// Eliminar un tema
router.delete("/:id", async (req, res) => {
  const temaId = req.params.id;

  try {
    const result = await topicSchema.findByIdAndDelete(temaId);
    if (!result) {
      return res.status(404).json({ message: "Tema no encontrado" });
    }

    res.json({ message: "Tema eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tema", error });
  }
});

// Obtener todos los comentarios de un tema
router.get("/:id/comments", async (req, res) => {
  try {
     const tema = await topicSchema.findById(req.params.id);
     if (!tema) {
       return res.status(404).json({ message: "Tema no encontrado" });
     }
     res.json(tema.comments);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener los comentarios del tema", error });
  }
 });

module.exports = router;
