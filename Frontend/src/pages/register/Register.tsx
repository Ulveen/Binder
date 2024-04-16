import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import AuthService from "../../services/authService";
import ToastService from "../../services/toastService";
import useCustomTheme from "../../contexts/ThemeContext";
import CustomButton from "../../components/CustomButton";
import OtpPlaceholder from "./components/OtpPlaceholder";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";

interface Props {
    navigation: any;
}

const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
]

export default function Register({ navigation }: Props) {
    const { theme, colorScheme } = useCustomTheme()
    const styles = getStyles(colorScheme)

    const authService = AuthService()
    const toastService = ToastService()

    const otpInputRef = useRef<TextInput>(null)

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)

    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState(new Date())
    const [binusian, setBinusian] = useState('')
    const [campus, setCampus] = useState('')
    const [isOpenGenderPicker, setIsOpenGenderPicker] = useState(false)
    const [gender, setGender] = useState('Male')

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

    function openOtpInput() {
        otpInputRef.current?.focus()
    }

    function handleOtpChange(text: string) {
        if (text.length > 4) return
        const otp = text.replace(/[^0-9]/g, '')
        setOtp(otp)
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
                <Text style={styles.title}>Register</Text>
                <Text style={styles.description}>
                    Please enter your valid email. We will send you a 4-digit code to verify your account.
                </Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                <CustomButton bgStyle={styles.continueBtn}
                    textStyle={styles.continueBtnText}
                    onPress={handleSendEmailOTP}
                    title="Continue"
                />
                <Text style={styles.redirectText}>
                    Already have an account?
                    <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}> Login</Text>
                </Text>
            </View>
        )

    if (step == 1)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Verify OTP Code</Text>
                <Text style={styles.emailLabel}>{email}</Text>
                <Text style={styles.description}>Enter 4 - digit code</Text>
                <TextInput style={{ display: "none" }} placeholder="OTP" value={otp} onChangeText={handleOtpChange} ref={otpInputRef} />
                <View style={styles.otpDiv}>
                    {[0, 1, 2, 3].map((_, idx) => {
                        return <OtpPlaceholder code={otp[idx]} openInput={openOtpInput} key={`OtpPlaceHolder${idx}`} />
                    })}
                </View>
                <CustomButton bgStyle={styles.continueBtn}
                    textStyle={styles.continueBtnText}
                    title="Verify"
                    onPress={handleVerifyEmailOTP} />
                <CustomButton bgStyle={styles.resendBtnText}
                    textStyle={styles.resendBtnText}
                    title="Resend Code"
                    onPress={handleSendEmailOTP} />
            </View>
        )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Details</Text>
            <Text style={styles.emailLabel}>{email}</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
            <TextInput style={styles.input} placeholder="Binusian" value={binusian} onChangeText={setBinusian} />
            <TextInput style={styles.input} placeholder="Campus" value={campus} onChangeText={setCampus} />
            <DropDownPicker style={styles.genderPicker}
                value={gender}
                setValue={setGender}
                items={genderOptions}
                open={isOpenGenderPicker}
                setOpen={setIsOpenGenderPicker} />
            <DatePicker style={styles.datePicker}
                mode="date"
                date={dob}
                onDateChange={setDob}
                theme={theme === 'light' ? 'light' : 'dark'} />
            <CustomButton bgStyle={styles.continueBtn}
                textStyle={styles.continueBtnText}
                title="Register"
                onPress={handleRegister} />
        </View>
    )
}

const getStyles = (colorScheme: { [key: string]: any }) => StyleSheet.create({
    container: {
        backgroundColor: colorScheme.background,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    description: {
        width: '80%',
        fontSize: 16,
        color: colorScheme.text
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colorScheme.primary
    },
    input: {
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        padding: 10,
        color: colorScheme.text,
        backgroundColor: colorScheme.background
    },
    redirectText: {
        color: colorScheme.text,
        fontSize: 16
    },
    continueBtn: {
        backgroundColor: colorScheme.primary,
        width: '80%',
    },
    continueBtnText: {
        color: 'white',
    },
    resendBtn: {
        backgroundColor: colorScheme.background,
        width: '80%',
    },
    resendBtnText: {
        color: colorScheme.primary,
    },
    emailLabel: {
        fontSize: 18,
        color: colorScheme.text
    },
    otpDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },
    genderPicker: {
        alignSelf: 'center',
        width: '80%',
    },
    datePicker: {
        height: 125
    }
})