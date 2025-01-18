import express from "express";
import cors from 'cors';
import { cadastrar, login, getUsuarios } from "./controllers/userController.js";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: '*',
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Permitir frontend
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); // Permitir credenciais (cookies)
    next();
});

app.use(express.json())

const PORT = 5000

// Routes
app.post('/users', cadastrar)
app.post('/auth/login', login)
app.get('/users', getUsuarios)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})