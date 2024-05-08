import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

export interface Theme {
    background: string;
    text: string;
    primary: string;
}

interface ThemeContextProps {
    userTheme: string
    toggleTheme: () => void
    theme: Theme
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

function useCustomTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useCustomTheme must be used within a ThemeProvider')
    }
    return context
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [userTheme, setUserTheme] = useState(user?.theme || 'light');

    function toggleTheme() {
        if(!user) return;
        user.theme = userTheme === 'light' ? 'dark' : 'light';
        setUserTheme(userTheme === 'light' ? 'dark' : 'light');
    };

    const baseTheme = {
        primary: '#E94057',
    };

    const darkTheme = {
        ...baseTheme,
        background: '#000000',
        text: '#FFFFFF'
    };

    const lightTheme = {
        ...baseTheme,
        background: '#FFFFFF',
        text: '#000000'
    };

    const theme = userTheme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme, userTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default useCustomTheme;
export { ThemeProvider };