const tareaService = require('../services/tareaService');

async function getTareas(req, res) {
    try {
        //req.user viene del middleware de verificar token
        const usuarioId = req.usuario.userId;
        const tareas = await tareaService.getTareas(usuarioId);
        res.status(200).json({ message: 'Tareas obtenidas', data: tareas });

    }
    catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
}


async function deleteTarea(req, res) {
    try {
        const { id } = req.params; // Extrae el id de la URL
        console.log("ID recibido en controlador:", id); // Debug

        const tarea = await tareaService.deleteTarea(id);
        res.status(200).json({ message: 'Tarea eliminada', data: tarea });
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
}

async function createTarea(req, res) {
    try {
        //req.user viene del middleware de verificar token
        const usuarioId = req.usuario.id;

        // Le pasamos la responsabilidad al service
        const tarea = await tareaService.createTarea(req.body, usuarioId);

        res.status(201).json({ message: 'Tarea creada', data: tarea });
    }
    catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ error: 'Error al crear tarea' });
    }
}

module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};