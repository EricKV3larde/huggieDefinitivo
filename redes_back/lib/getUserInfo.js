function getUserInfo(user) {
    return {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
    };
}

module.exports = { getUserInfo };
