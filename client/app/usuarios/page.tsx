'use client'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Usuarios() {
    const { token, logout } = useContext(AuthContext)
    console.log(token)

    if (!token) {
        return <p>Você precisa estar logado para acessar esta página.</p>;
    }

    return (
        <>
            <h1>Página de usuários registrados:</h1>
            <button onClick={logout}>Sair</button>
        </>
    )
}