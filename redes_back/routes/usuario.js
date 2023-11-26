const express = require('express');
const { jsonResponse } = require('../lib/jsonResponse.js');
const router = express.Router();


router.get("/",(req,res)=>{
    // res.send("usuario");
    res.status(200).json(jsonResponse(200,req.user));
});

module.exports = router;