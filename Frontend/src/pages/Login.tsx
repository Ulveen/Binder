import { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import AuthService from "../services/authService";
import ToastService from "../services/toastService";
import { useAuth } from "../contexts/authContext";

interface Props {
    navigation: any
}

export default function Login({ navigation }: Props) {
    const { login } = useAuth()

    const toastService = ToastService()
    const authService = AuthService()

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
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
            <Button title="Login" onPress={handleLogin} />
            <Text>Don't have an account? <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Register')}>Register</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})