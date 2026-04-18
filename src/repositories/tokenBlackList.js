const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // <--- Aquí se crea la instancia que tiene el método 'create'

async function agregarToken(token) {
    // según tu modelo 'model TokenRevocado'
    return await prisma.tokenRevocado.create({
        data: {
            token: token
        }
    });
}

async function estaRevocado(token) {
    const encontrado = await prisma.tokenRevocado.findFirst({
        where: { token: token }
    });
    return encontrado !== null;
}

module.exports = {
    agregarToken,
    estaRevocado
};