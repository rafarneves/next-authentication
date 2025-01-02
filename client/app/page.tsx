import Link from "next/link";

export default function Page() {
    return (
        <>
            <h1>Página inicial</h1>

            <ul>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/register">Cadastro</Link>
                </li>
                <li>
                    <Link href="/usuarios">Usuarios</Link>
                </li>
            </ul>
        </>
    )
}