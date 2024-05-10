import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

const firebaseAuth = auth()

export interface User {
    name: string,
    email: string,
    password: string,
    dob: Date,
    binusian: string,
    campus: string,
    gender: string,
    uid: string,
    theme: string,
    profileImage: string
}

async function sendEmailOTP(email: string) {
    console.log(process.env.BACKEND_URL);
   
    const to = `${process.env.BACKEND_URL}/auth/sendEmailOTP`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email: email })

    const result = await fetch(to, {
        method: 'POST',
        headers: headers,
        body: body
    })
    
    if (!result.ok) {
        throw Error(await result.text())
    }

}

async function verifyEmailOTP(email: string, otp: string) {
    const to = `${process.env.BACKEND_URL}/auth/verifyEmailOTP`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email: email, otp: otp })

    const result = await fetch(to, {
        method: 'POST',
        headers: headers,
        body: body
    })

    if (!result.ok) {
        throw Error(await result.text())
    }

}

async function register(email: string, password: string, name: string, dob: Date, binusian: string, campus: string, gender: string, profileImage: string) {
    const to = `${process.env.BACKEND_URL}/auth/register`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email: email, password: password, name: name, dob: dob, binusian: binusian, campus: campus, gender: gender, profileImage: profileImage })

    const result = await fetch(to, {
        method: 'POST',
        headers: headers,
        body: body
    })

    if (!result.ok) {
        throw Error(await result.text())
    }
}

async function login(email: string, password: string) {
    console.log('login');

    if (!email || !password) {
        throw new Error('Email and password are required')
    }

    if (!email.endsWith('@binus.ac.id')) {
        throw new Error('Please use your binus.ac.id email')
    }
    
    try {
        await firebaseAuth.signInWithEmailAndPassword(email, password)

    } catch (error: any) {
        if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email')
        }
        if (error.code === 'auth/user-disabled') {
            throw new Error('User is disabled')
        }
        if (error.code === 'auth/user-not-found') {
            throw new Error('User not found')
        }
        if (error.code === 'auth/wrong-password') {
            throw new Error('Wrong password')
        }
        throw new Error(error.message)
    }

    const to = `${process.env.BACKEND_URL}/auth/login`
        const headers = { 'Content-Type': 'application/json' }
        const body = JSON.stringify({ email: email })

        const result = await fetch(to, {
            method: 'POST',
            headers: headers,
            body: body
        })

        if (!result.ok) {
            throw new Error(await result.text())
        }

        const data = (await result.json()).data;

        console.log(data);
        
        return data
}

async function verifyToken() {
    console.log('verifyToken');
    
    const token = await AsyncStorage.getItem('authorization')

    console.log('token', token);
    
    if(!token) {
        return null
    }

    const to = `${process.env.BACKEND_URL}/auth/verifyToken`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ token: token })

    const result = await fetch(to, {
        method: 'POST',
        headers: headers,
        body: body
    })

    if (!result.ok) {
        throw Error(await result.text())
    }

    return (await result.json()).data as User
}

function renderProfileImage(profileImageUri: string | undefined) {
    return profileImageUri ? { uri: profileImageUri } : require('../assets/Profile.jpg')
}

export default function AuthService() {
    return { sendEmailOTP, verifyEmailOTP, register, login, verifyToken, renderProfileImage }
}