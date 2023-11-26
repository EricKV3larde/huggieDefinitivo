const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse.js');
const User = require('../schema/user.js');
const { getUserInfo } = require('../lib/getUserInfo.js');
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!!email || !!!password) {
    return res.status(400).json(jsonResponse(400, {
      error: "Faltan campos papu",
    }));
  }

  const user = await User.findOne({
    email
  });

  if(user){
    const contracorrecta = await user.comparePassword(password, user.password);

    if(contracorrecta){
        // Sse valida el usuario
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createrefrescarToken();

        res.status(201).json(jsonResponse(200,{user: getUserInfo(user),accessToken, refreshToken}));
    }else{
        res.status(400).json(jsonResponse(400,{
            error:"ingresos incorrectos",
        })
        );
    }
  }else{
    res.status(400).json(jsonResponse(400,{
        error:"Usuario/email no econtrado",
    })
    );
  }
        //   const user = {
        //     id:'1',
        //     name: 'Papu',
        //     email: 'papu@papu.com',
        //   };

});

module.exports = router;
