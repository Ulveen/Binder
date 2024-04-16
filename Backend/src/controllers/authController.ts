import { Request, Response } from 'express';
import JwtController from './jwtController';
import EmailController from './emailController';
import firebaseAdmin from '../firebase/firebase';

export interface User {
    email: string,
    password: string,
    dob: Date,
    binusian: string,
    campus: string,
    gender: string,
    uid: string
}

async function sendEmailOTP(req: Request, res: Response) {
    const { email }: { email: string } = req.body

    if (!email) {
        res.status(400).send('Email is required')
        return
    }

    if (!email.endsWith('@binus.ac.id')) {
        res.status(400).send('Please use your binus.ac.id email')
        return
    }

    try {
        const userRecord = await firebaseAdmin.auth.getUserByEmail(email)

        if (userRecord) {
            res.status(400).send('User with this email already exists')
            return
        }

    } catch (error: any) {
        if (error.code !== 'auth/user-not-found') {
            res.status(500).send('Internal server error');
            return
        }
    }

    try {
        const code = Math.floor(1000 + Math.random() * 9000).toString()

        const otpPromise = firebaseAdmin.db.collection('otp').doc(email).set({ code: code })
        const emailPromise = EmailController.sendEmail(email, 'BINDER Verification OTP Code', code)

        await Promise.all([otpPromise, emailPromise])

        res.status(200).json({ data: 'Email sent' })

    } catch (error: any) {
        res.status(500).send(error.message)
    }

}

async function verifyEmailOTP(req: Request, res: Response) {
    const { email, otp }: { email: string, otp: string } = req.body

    if (!email || !otp) {
        res.status(400).send('Email and OTP are required')
        return
    }

    const otpRecord = await firebaseAdmin.db.collection('otp').doc(email).get()

    if (!otpRecord.exists) {
        res.status(404).send('OTP not found')
        return
    }

    const data = otpRecord.data()

    if (data?.code !== otp) {
        res.status(401).send('Invalid OTP')
        return
    }

    firebaseAdmin.db.collection('otp').doc(email).delete();

    res.status(200).json({ data: 'OTP verified' })
}

async function register(req: Request, res: Response) {
    const { email, password, dob, binusian, campus, gender }: User = req.body

    if (!email || !password || !dob || !binusian || !campus || !gender) {
        res.status(400).send('All fields must not be empty')
        return
    }

    if (password.length < 6) {
        res.status(400).send('Password must be at least 6 characters')
        return
    }

    try {
        const createUserPromise = firebaseAdmin.auth.createUser({
            email: email,
            password: password
        })

        const insertUserDataPromise = firebaseAdmin.db.collection('users').doc(email).set({
            dob: dob,
            binusian: binusian,
            campus: campus,
            gender: gender
        })

        await Promise.all([createUserPromise, insertUserDataPromise])

        res.status(200).json({ data: 'User registered' })

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

async function login(req: Request, res: Response) {

    const { email }: { email: string } = req.body

    if (!email) {
        res.status(400).send('Email is required')
        return
    }

    try {
        const userRecord = await firebaseAdmin.auth.getUserByEmail(email)
        const userData = await firebaseAdmin.db.collection('users').doc(email).get()

        if (!userData.exists || !userData.data()) {
            res.status(404).send('User does not exist')
            return
        }

        const user: User = userData.data()! as User
        user.email = email
        user.uid = userRecord.uid

        const token = JwtController.generateToken(user)

        res.status(200).json({ data: { user: user, token: token } })

    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            res.status(404).send('User does not exist')
            return
        }
        res.status(500).send(error.message)
        return
    }

}

async function verifyToken(req: Request, res: Response) {
    const token = req.body.token

    if (!token) {
        res.status(400).send('Token is required')
        return
    }

    try {
        const user = JwtController.decodeToken(token)
        res.status(200).json({ data: user })
    } catch (error: any) {
        res.status(401).send(error.message)
    }

}

const AuthController = { sendEmailOTP, verifyEmailOTP, register, login, verifyToken }

export default AuthController