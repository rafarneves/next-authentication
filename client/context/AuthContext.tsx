'use client'
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextData {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }) {
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedToken = Cookies.get('authToken');
        if (storedToken) {
            setToken(storedToken);
        }

        setIsInitialized(true)
    }, []);

    const login = (token: string) => {
        setToken(token);
        Cookies.set('authToken', token, { secure: true, sameSite: 'Strict' });
    }

    const logout = () => {
        setToken(null);
        Cookies.remove('authToken');
        router.push('/login')
    }

    if (!isInitialized) {
        // Evita renderizar qualquer coisa enquanto o token não for carregado
        return null;
    }

    console.log(token)
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}