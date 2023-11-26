const { jsonResponse } = require("../lib/jsonResponse.js");
const { getTokenFromHeader } = require("./getTokenFromHeader.js");
const { verificarAccesoToken } = require("./verificarToken.js");

function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers);

    if (token) {
        const decoded = verificarAccesoToken(token);
        if (decoded) {
            req.user = { ...decoded.user };
            next();
        } else {
            res.status(401).json(
                jsonResponse(401, {
                    message: "No hay token válido",
                })
            );
        }
    } else {
        res.status(401).json(
            jsonResponse(401, {
                message: "No hay token",
            })
        );
    }
}

module.exports = { authenticate };