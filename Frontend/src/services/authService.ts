import AsyncStorage from '@react-native-async-storage/async-storage'
import User from '../models/User';

async function sendEmailOTP(email: string) {
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
    const to = `${process.env.BACKEND_URL}/auth/login`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email: email, password: password})

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
    const token = await AsyncStorage.getItem('authorization')

    console.log('token', token);

    if (!token) {
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

export default function AuthService() {
    return { sendEmailOTP, verifyEmailOTP, register, login, verifyToken }
}