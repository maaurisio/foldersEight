const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const tareaRepository = require('../repositories/tareaRepository');

async function getTareas(usuarioId) {
    return await tareaRepository.getTareas(usuarioId);
}

async function deleteTarea(id) {
    return await tareaRepository.deleteTarea(id);
}

//Recibiendo dos argumentos (Recomendado)
async function createTarea(body, usuarioId) {
    return await prisma.tarea.create({
        data: {
            titulo: body.titulo,
            descripcion: body.descripcion,
            usuario: {
                // Si usuarioId llega como undefined aquí, sale el error que tienes
                connect: { id: usuarioId }
            }
        }
    });
}

module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};