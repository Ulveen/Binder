import { useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import AuthService from "../../services/authService";
import CustomButton from "../../components/CustomButton";
import OtpPlaceholder from "./components/OtpPlaceholder";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { launchImageLibrary } from "react-native-image-picker";
import useCustomTheme from "../../hooks/useCustomTheme";
import useAsyncHandler from "../../hooks/useAsyncHandler";
import CustomTheme from "../../models/CustomTheme";
import { openImageGallery, renderProfileImage } from "../../utils/imageUtils";

interface Props {
    navigation: any;
}

const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
]

const authService = AuthService()

export default function Register({ navigation: { navigate } }: Props) {
    const { theme, userTheme } = useCustomTheme()
    const styles = getStyles(theme)

    const otpInputRef = useRef<TextInput>(null)

    const [step, setStep] = useState(0)

    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')

    const [profileUri, setProfileUri] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState(new Date())
    const [binusian, setBinusian] = useState('')
    const [campus, setCampus] = useState('')
    const [isOpenGenderPicker, setIsOpenGenderPicker] = useState(false)
    const [gender, setGender] = useState('Male')

    const { executeAsync: handleSendEmailOTP } = useAsyncHandler(
        async function () {
            await authService.sendEmailOTP(email)
            setStep(1)
        },
        "Check your email for the OTP code."
    )

    const { executeAsync: handleVerifyEmailOTP } = useAsyncHandler(
        async function () {
            await authService.verifyEmailOTP(email, otp)
            setStep(2)
        }
    )

    const { executeAsync: handleRegister } = useAsyncHandler(
        async function () {
            await authService.register(email, password, name, dob, binusian, campus, gender, profileImage)
            setStep(0);
            setEmail('');
            setOtp('');
            setProfileUri('');
            setProfileImage('');
            setName('');
            setPassword('');
            setDob(new Date());
            setBinusian('');
            setCampus('');
            setIsOpenGenderPicker(false);
            setGender('Male');
            navigate('Login')
        },
        "Account registered successfully."
    )

    function openOtpInput() {
        otpInputRef.current?.focus()
    }

    function handleOtpChange(text: string) {
        if (text.length > 4) return
        const otp = text.replace(/[^0-9]/g, '')
        setOtp(otp)
    }

    async function handlePickImage() {
        const assets = await openImageGallery('photo')
        if (assets) {
            setProfileUri(assets![0].uri!)
            setProfileImage(assets![0].base64!)
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
                <CustomButton style={styles.continueBtn} onPress={handleSendEmailOTP}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                </CustomButton>
                <Text style={styles.redirectText}>
                    Already have an account?
                    <Text style={{ color: 'blue' }} onPress={() => navigate('Login')}> Login</Text>
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
                    {[0, 1, 2, 3].map(idx => {
                        return <OtpPlaceholder code={otp[idx]} openInput={openOtpInput} key={`OtpPlaceHolder${idx}`} />
                    })}
                </View>
                <CustomButton style={styles.continueBtn} onPress={handleVerifyEmailOTP}>
                    <Text style={styles.continueBtnText}>Verify</Text>
                </CustomButton>
                <CustomButton style={styles.resendBtn} onPress={handleSendEmailOTP}>
                    <Text style={styles.resendBtnText}>Resend Code</Text>
                </CustomButton>
            </View>
        )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Details</Text>
            <TouchableOpacity onPress={handlePickImage}>
                <Image style={styles.profileImage} source={renderProfileImage(profileUri)} />
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
            <TextInput style={styles.input} placeholder="Binusian" value={binusian} onChangeText={setBinusian} />
            <TextInput style={styles.input} placeholder="Campus" value={campus} onChangeText={setCampus} />
            <DropDownPicker style={styles.genderPicker}
                textStyle={styles.genderPickerText}
                containerStyle={{ width: '80%' }}
                value={gender}
                setValue={setGender}
                items={genderOptions}
                open={isOpenGenderPicker}
                setOpen={setIsOpenGenderPicker} />
            <DatePicker style={styles.datePicker}
                mode="date"
                date={dob}
                onDateChange={setDob}
                title={'Date of Birth'}
                minimumDate={new Date(1900, 0, 1)}
                theme={userTheme === 'light' ? 'light' : 'dark'} />
            <CustomButton style={styles.continueBtn} onPress={handleRegister}>
                <Text style={styles.continueBtnText}>Register</Text>
            </CustomButton>
        </View>
    )
}

const getStyles = (theme: CustomTheme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    description: {
        width: '80%',
        fontSize: 16,
        color: theme.text
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.primary
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    input: {
        width: '80%',
        borderColor: theme.text,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        padding: 10,
        color: theme.text,
        backgroundColor: theme.background
    },
    redirectText: {
        color: theme.text,
        fontSize: 16
    },
    continueBtn: {
        backgroundColor: theme.primary,
        width: '80%',
    },
    continueBtnText: {
        color: 'white',
    },
    resendBtn: {
        backgroundColor: theme.background,
        width: '80%',
    },
    resendBtnText: {
        color: theme.primary,
    },
    emailLabel: {
        fontSize: 18,
        color: theme.text
    },
    otpDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },
    genderPicker: {
        alignSelf: 'center',
    },
    genderPickerText: {
        fontSize: 18
    },
    datePicker: {
        height: 110,
    }
})