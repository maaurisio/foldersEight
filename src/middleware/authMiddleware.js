const jwt = require('jsonwebtoken');
const blacklistRepository = require('../repositories/tokenBlackList');
const secret_key = process.env.JWT_SECRET;

// Middleware para verificar el token

async function verifyToken(req, res, next) {
    //si la cabecera de autorización no existe, respondemos con un error
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    //el primer elemento del split es "Bearer" y el segundo es el token
    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'no se proprorciono el token modificado' });
    }

    //revocado
    const revocado = await blacklistRepository.estaRevocado(token);
    if (revocado) {
        return res.status(401).json({ message: 'Token revocado' });
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        req.usuario = decoded; // Agregar la información del usuario al objeto de solicitud
        // Continuar con la siguiente función middleware o controlador
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = {
    verifyToken
}
