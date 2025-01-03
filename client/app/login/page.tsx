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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, senha });
            login(response.data.token);
            setMsg('Login realizado com sucesso!');
            router.push('/')
        } catch (err) {
            setMsg(err.response?.data?.erro || 'Errro no login!')
            router.push('/login')
        }
    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>

            {msg && <p>{msg}</p>}
        </>
    )
}