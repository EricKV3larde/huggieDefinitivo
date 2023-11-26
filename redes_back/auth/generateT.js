const jwt = require("jsonwebtoken");

function sign(payload, isAccessToken) {
    return jwt.sign(
        { email: payload.email },
        isAccessToken ? process.env.tokenAccesoSecreto : process.env.tokenRefrescoSecreto,
        {
            algorithm: "HS256",
            expiresIn: 3600,
        }
    );
}

function generateAccessToken(email) {
    return sign({ email }, true);
}

function generateRefrescarToken(email) {
    return sign({ email }, false);
}

module.exports = { generateAccessToken, generateRefrescarToken };
