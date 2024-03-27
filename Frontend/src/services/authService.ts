import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

const BASE_URL = `${process.env.BACKEND_URL}/auth`
const firebaseAuth = auth()

export interface User {
    email: string,
    password: string,
    dob: Date,
    binusian: string,
    campus: string,
    gender: string,
    uid: string
}

async function sendEmailOTP(email: string) {
    const to = `${BASE_URL}/sendEmailOTP`
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
    const to = `${BASE_URL}/verifyEmailOTP`
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

async function register(email: string, password: string, name: string, dob: string, binusian: string, campus: string, gender: string) {
    let dobDate = new Date()

    try {
        dobDate = new Date(dob)
    } catch (error: any) {
        throw Error('Invalid date format')
    }

    const to = `${BASE_URL}/register`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email: email, password: password, name: name, dob: dobDate, binusian: binusian, campus: campus, gender: gender })

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
    try {
        await firebaseAuth.signInWithEmailAndPassword(email, password)

        const to = `${BASE_URL}/login`
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

        return data

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
}

async function verifyToken() {
    const token = await AsyncStorage.getItem('authorization')

    const to = `${BASE_URL}/verifyToken`
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

export default function AuthService() {
    return { sendEmailOTP, verifyEmailOTP, register, login, verifyToken }
}