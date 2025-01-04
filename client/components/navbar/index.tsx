'use client'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Link from "next/link";

export default function Navbar() {
    const { token, logout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <nav>
                <ul>
                    {token &&  (
                        <>
                            <li><Link href="/">Início</Link></li>
                            <li>
                                <Link href="/usuarios">Usuários</Link>
                            </li>
                            <li>
                                <span onClick={logout}>Logout</span>
                            </li>
                        </> 
                    )}
                    <li>
                        <Link href="/register">Cadastro</Link>
                    </li>
                    {!token && (
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}