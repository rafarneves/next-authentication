import { cadastrarUsuario, logarUsuario, usuariosCadastrados } from '../services/userService.js'

async function cadastrar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
        }

        // Validação do formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ erro: 'O email fornecido é inválido.' });
        }

        const usuario = await cadastrarUsuario(nome, email, senha)
        res.status(201).json(usuario)
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        // Validação dos campos obrigatórios
        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
        }

        // Validação do formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ erro: 'O email fornecido é inválido.' });
        }

        // Chamada ao serviço para autenticar o usuário
        const token = await logarUsuario(email, senha);
        res.status(200).json(token);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

async function getUsuarios(req, res) {
    try {
        const usuarios = await usuariosCadastrados();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar usuários!' });
    }
}

export { cadastrar, login, getUsuarios };