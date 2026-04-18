const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { autorizeRoles } = require('../middleware/rolMiddleware');
const verifyToken = require('../middleware/authMiddleware').verifyToken;


router.get('/tareas', verifyToken, tareaController.getTareas);
router.post('/tareas', verifyToken, autorizeRoles('admin'), tareaController.createTarea);

router.delete('/tareas/:id', verifyToken, autorizeRoles('admin'), tareaController.deleteTarea);

module.exports = router;