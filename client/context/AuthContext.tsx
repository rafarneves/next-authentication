'use client'
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const valueToken = window.localStorage.getItem('authToken')
        if (valueToken) setToken(valueToken)
    }, [])

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem('authToken', token);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}