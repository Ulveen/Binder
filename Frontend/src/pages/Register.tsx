import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import AuthService from "../services/authService";
import ToastService from "../services/toastService";

interface Props {
    navigation: any;
}

export default function Register({ navigation }: Props) {
    const authService = AuthService()
    const toastService = ToastService()

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)

    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [binusian, setBinusian] = useState('')
    const [campus, setCampus] = useState('')
    const [gender, setGender] = useState('')

    async function handleSendEmailOTP() {
        if (loading) return

        setLoading(true)

        try {
            await authService.sendEmailOTP(email)
            setStep(1)
            toastService.success('Email Sent', 'Check your email for the OTP code')
        } catch (error: any) {
            toastService.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleVerifyEmailOTP() {
        if (loading) return

        setLoading(true)

        try {
            await authService.verifyEmailOTP(email, otp)
            setStep(2)
        } catch (error: any) {
            toastService.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleRegister() {
        if (loading) return

        setLoading(true)

        try {
            await authService.register(email, password, name, dob, binusian, campus, gender)
            toastService.success('Success', 'You can now login')
            navigation.navigate('Login')
        } catch (error: any) {
            toastService.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (step == 0)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Send OTP Code</Text>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <Button title="Send OTP" onPress={handleSendEmailOTP} />
                <Text>Already have an account? <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
            </View>
        )

    if (step == 1)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Verify OTP Code</Text>
                <Text>{email}</Text>
                <TextInput style={styles.input} placeholder="OTP" value={otp} onChangeText={setOtp} />
                <Button title="Verify" onPress={handleVerifyEmailOTP} />
                <Text>Didn't receive the code? <Text style={{ color: 'blue' }} onPress={handleSendEmailOTP}>Resend</Text></Text>
            </View>
        )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text>{email}</Text>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Date of Birth" value={dob} onChangeText={setDob} />
            <TextInput style={styles.input} placeholder="Binusian" value={binusian} onChangeText={setBinusian} />
            <TextInput style={styles.input} placeholder="Campus" value={campus} onChangeText={setCampus} />
            <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />
            <Button title="Register" onPress={handleRegister} />
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