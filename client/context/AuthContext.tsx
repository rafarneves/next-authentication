'use client'
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }) {
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }

        setIsInitialized(true)
    }, []);

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem('authToken', token);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
    }

    if (!isInitialized) {
        // Evita renderizar qualquer coisa enquanto o token não for carregado
        return null;
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}