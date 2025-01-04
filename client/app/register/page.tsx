'use client'
import { useState } from "react";
import api from "../../services/api";

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/users/register', { nome, email, senha });
            setFeedback('Usuário(a) cadastrado(a) com sucesso!');
        } catch (err) {
            setFeedback(err.response?.data?.erro || 'Erro no cadastro.')
        }
    }

    return (
        <div className="container_wrapper">
            <div className="form_login">
                <form onSubmit={handleRegister}>
                    <h1>Cadastro</h1>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button type="submit">Cadastrar</button>
                </form>
                <div className="form-feedback">
                    <p>{feedback}</p>
                </div>
            </div>
        </div>
    )
}