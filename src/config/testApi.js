const axios = require('axios');

async function testGetTareas() {
    try {
        const response = await axios.get('http://localhost:3000/api/tareas');
        console.log('Tareas obtenidas:', response.data);
    }
    catch (error) {
        console.error('Error al obtener tareas:', error.message);
    }
}

testGetTareas();