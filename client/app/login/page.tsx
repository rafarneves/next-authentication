'use client'
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msg, setMsg] = useState('');
    const { login } = useContext(AuthContext)
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, senha });

            if (!response.data.sucesso) {
                setMsg(response.data.erro)
                return
            }

            login(response.data.token);
            router.push('/')
        } catch (err: any) {
            setMsg(err.response?.data?.erro || 'Errro no login.')
            router.push('/login')
        }
    }

    return (
        <div className="container_wrapper">
            <div className="form_login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
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
                    <button type="submit">Entrar</button>
                </form>
                <div className="form-feedback">
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    )
}