const authService = require('../services/authService');
const blacklistRepository = require('../repositories/tokenBlackList');

async function register(req, res) {
    console.log(req.body);
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//login
async function login(req, res) {
    try {
        const token = await authService.loginUser(req.body);
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//logout
async function logout(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    console.log("¿Qué tiene el repositorio?:", blacklistRepository);
    await blacklistRepository.agregarToken(token);
    res.status(200).json({ message: 'Logout exitoso' });
}

module.exports = {
    register,
    login,
    logout
};