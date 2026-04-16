require('dotenv').config();

const authRoutes = require('./routes/authRoute');
const tareaRoutes = require('./routes/tareaRoutes');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//CORS
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000' || process.env.CORS_ORIGIN, // Permitir todas las fuentes (*)
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
};
app.use(cors(corsOptions));


app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/test-db', async (req, res) => {
    try {
        await prisma.$connect();
        res.json({ message: 'Database connection successful' });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});
//Rutas
app.use('/api', tareaRoutes);
app.use('/api', authRoutes);


//-------------------------
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
