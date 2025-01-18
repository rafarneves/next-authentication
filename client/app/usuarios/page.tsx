'use client'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Usuarios() {
    return (
        <div className="container_wrapper">
            <h1>Usuários cadastrados</h1>
            <p>Rafael</p>
            <p>XUXA</p>
        </div>
    )
}