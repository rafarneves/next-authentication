'use client'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { redirect } from "next/navigation";

export default function Usuarios() {
   const { logout } = useContext(AuthContext)

    return (
        <>
            <h1>Página de usuários registrados:</h1>
            <button onClick={logout}>Sair</button>
        </>
    )
}