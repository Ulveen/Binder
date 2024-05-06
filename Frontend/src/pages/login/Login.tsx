import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import AuthService from "../../services/authService";
import ToastService from "../../services/toastService";
import { useAuth } from "../../contexts/AuthContext";
import useCustomTheme from "../../contexts/ThemeContext";
import TextButton from "../../components/TextButton";

interface Props {
    navigation: any
}

const toastService = ToastService()
const authService = AuthService()

export default function Login({ navigation: { navigate } }: Props) {
    const { login } = useAuth()
    const { colorScheme } = useCustomTheme()

    const styles = getStyles(colorScheme)

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        if (loading) return

        setLoading(true)
        try {
            const data = await authService.login(email, password)
            login(data)
        } catch (error: any) {
            toastService.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputDiv}>
                <Text style={styles.inputLabel}>Email (@binus.ac.id)</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            </View>
            <View style={styles.inputDiv}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true} />
            </View>
            <TextButton bgStyle={styles.loginBtn}
                textStyle={styles.loginBtnText}
                title="Continue"
                onPress={handleLogin} />
            <Text style={styles.redirectText}>
                Don't have an account?
                <Text style={{ color: 'blue' }} onPress={() => navigate('Register')}> Register</Text>
            </Text>
        </View>
    )
}


const getStyles = (colorScheme: { [key: string]: any }) => StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colorScheme.background
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colorScheme.primary
    },
    inputDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        gap: 10
    },
    inputLabel: {
        fontSize: 20,
        color: colorScheme.text,
        fontStyle: 'italic'
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        padding: 10,
        color: colorScheme.text,
        backgroundColor: colorScheme.background
    },
    loginBtn: {
        width: '80%',
        backgroundColor: colorScheme.primary,
    },
    loginBtnText: {
        color: 'white',
    },
    redirectText: {
        color: colorScheme.text,
        fontSize: 16
    }
})