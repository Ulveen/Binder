import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService, { User } from "../services/authService";

interface AuthContextProps {
    user: User | undefined | null
    login: (data: { user: User, token: string }) => void
    logout: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("authContext must be used within an AuthProvider");
    }
    return context
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | undefined | null>()

    async function login(data: { user: User, token: string }) {
        setUser(data.user)
        await AsyncStorage.setItem("authorization", data.token)
    }

    async function logout() {
        setUser(null)
        await AsyncStorage.removeItem("authorization")
    }

    async function verifyToken() {
        const authService = AuthService()
        try {
            const user = await authService.verifyToken()
            setUser(user)
        } catch (error: any) {
            logout()
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}