import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useColorScheme } from "react-native";

interface ThemeContextProps {
    theme: string
    toggleTheme: () => void
    colorScheme: { [key: string]: any }
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

function useCustomTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useCustomTheme must be used within a ThemeProvider')
    }
    return context
}

const darkTheme = {
    primary: '#E94057',
    background: '#000000',
    text: '#FFFFFF'
}

const lightTheme = {
    primary: '#E94057',
    background: '#FFFFFF',
    text: '#000000'
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [theme, setTheme] = useState(user?.theme || useColorScheme() || 'light')

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const colorScheme = theme === 'light' ? lightTheme : darkTheme

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default useCustomTheme;
export { ThemeProvider };