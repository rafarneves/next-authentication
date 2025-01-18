import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { handleError, ErrorHandler } from '../utils/ErrorHandler';

const prisma = new PrismaClient()
const KEY = process.env.SECRET_KEY || '';

const validarEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ErrorHandler('O email fornecido é inválido.', 400);
    }
}

const validarSenha = (senha: string) => {
    const senhaForte =  /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    if (!senhaForte.test(senha)) {
        throw new ErrorHandler('A senha deve ter no mínimo 8 caracteres e incluir pelo menos uma letra e um número.', 400)
    }
}

async function cadastrarUsuario(nome, email, senha) {
    // Verificar se o email já existe
    const emailExistente = await prisma.user.findUnique({ where: { email } });
    if (emailExistente) {
        throw new Error('Esse email já existe.')
    }

    // Validação de senha
    const senhaForte = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    if (!senhaForte.test(senha)) {
        throw new Error('A senha deve ter no mínimo 8 caracteres e incluir pelo menos uma letra e um número.');
    }

    // Validação de campos obrigatórios
    if (!nome || !email || !senha) {
       throw new Error('Nome, email e senha são obrigatórios.');
    }

    // Validação do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('O email fornecido é inválido.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    return prisma.user.create({
        data: { nome, email, senha: senhaHash },
    });
}

async function logarUsuario(email, senha) {
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) throw new Error('Usuário não encontrado.')

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new Error('Senha inválida.');

    const token = jwt.sign({ 
        id: usuario.id,
        email: usuario.email
    }, KEY, { expiresIn: '1h' });

    return token;
}

async function usuariosCadastrados() {
     return await prisma.user.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
            createdAt: true
        }
     })
}

export { cadastrarUsuario, logarUsuario, usuariosCadastrados }