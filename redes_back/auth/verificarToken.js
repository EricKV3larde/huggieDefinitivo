const jwt = require("jsonwebtoken");

function verificarAccesoToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function verificarRefrescarToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { verificarAccesoToken, verificarRefrescarToken };
