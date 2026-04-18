const bycrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

// Número de rondas para el hash de la contraseña
const SALT_ROUNDS = 10;

async function registerUser(data) {
    const userExists = await userRepository.obtenerPorEmail(data.email);
    if (userExists) {
        throw new Error('El usuario ya existe');
    }

    // Hash de la contraseña antes de guardarla
    const hashedPassword = await bycrypt.hash(data.password, SALT_ROUNDS);
    const user = await userRepository.createUser({ ...data, password: hashedPassword, rol: data.rol });

    return user;
}

//Login
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const secret_key = jwtSecret;

async function loginUser(data) {
    const user = await userRepository.obtenerPorEmail(data.email);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const passwordMatch = await bycrypt.compare(data.password, user.password);
    if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
    }

    const payload = { id: user.id, email: user.email, rol: user.rol };

    //firmar el token con el payload y la clave secreta
    const token = jwt.sign(payload, secret_key, { expiresIn: '1h' });
    return token;
}




module.exports = {
    registerUser,
    loginUser,
};