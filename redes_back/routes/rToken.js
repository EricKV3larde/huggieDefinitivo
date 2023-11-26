const express = require('express');
const { getTokenFromHeader } = require('../auth/getTokenFromHeader.js');
const { jsonResponse } = require('../lib/jsonResponse.js');
const Token = require('../schema/token.js');
const { verificarRefrescarToken } = require('../auth/verificarToken.js');
const { generateAccessToken } = require('../auth/generateT.js');

const router = express.Router();


router.post("/", async (req,res)=>{

    const refreshToken = getTokenFromHeader(req.headers);
    if(refreshToken){
        try {
            const found = await Token.findOne({token:refreshToken});
            if(!found){
                res.status(401).send(jsonResponse(401,{error:"Sin Autorizacion"}));
            }

            const payload = verificarRefrescarToken(found.token);
            if (payload){
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).json(jsonResponse(200,{accessToken}));
            }else{
                return res.status(401).send(jsonResponse(401,{error:"Sin Autorizacion"}));
            }
        } catch (error) {
            return res.status(401).send(jsonResponse(401,{error:"Sin Autorizacion"}));
        }
    }else{
        res.status(401).send(jsonResponse(401,{error:"Sin Autorizacion"}));
    }
    res.send("Refrescar token");
});
module.exports = router;