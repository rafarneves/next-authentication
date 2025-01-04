import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const KEY = process.env.SECRET_KEY

async function cadastrarUsuario(nome, email, senha) {
    // Verificar se o email já existe
    const emailExistente = await prisma.user.findUnique({ where: { email } });
    if (emailExistente) {
        throw new Error('O email já está cadastrado!')
    }

    // Validação de senha
    const senhaForte = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    if (!senhaForte.test(senha)) {
        throw new Error('A senha deve ter no mínimo 8 caracteres e incluir pelo menos uma letra e um número.');
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

    return { token };
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