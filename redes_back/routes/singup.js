const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse.js');
const User = require('../schema/user.js');

const router = express.Router();


router.post("/", async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!!nombre || !!!apellido || !!!email || !!!password) {
    return res.status(400).json(jsonResponse(400, {
      error: "Faltan campos papu",
    }));
  }

//   // Se crea el usuario satisfactoriamente
//   const user = new User({
//     nombre,
//     apellido,
//     email,
//     password
//   });

try {
    const user = new User();
    const exists = await user.emailnameExist(email);

    if(exists){
        return res.status(400).json(
            jsonResponse(400,{
            error: "El el correo ya esta en uso",
        })
        );

    }
    const newUser = new User({
        nombre,
        apellido,
        email,
        password
    });

    await newUser.save();

    res.status(201).json(jsonResponse(200, { message: "Usuario Creado" }));
    res.send("singout")
} catch (error) {
   res.status(500).json(
    jsonResponse(500,{
        error: "Error al crear el usuario",
    })
   );
}



});

module.exports = router;

