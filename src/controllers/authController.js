const authService = require('../services/authService');

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


module.exports = {
    register,
    login
};