import { Request, Response } from 'express';
import EmailController from './emailController';
import firebaseAdmin from '../firebase/firebase';
import User from '../models/User';
import { comparePassword, encryptPassword } from '../utils/bcryptUtils';
import { getImageDownloadUrl, uploadImage } from '../utils/imageUtils';
import { decodeJWTToken, generateJWTToken } from '../utils/jwtUtils';

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
        const userSnapshot  = await firebaseAdmin.db.collection('users').doc(email).get()
        if(userSnapshot.exists) {
            res.status(400).send('Email already registered')
            return
        }
    } catch (error: any) {
        res.status(500).send(error.message)
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

    if (!email.endsWith('@binus.ac.id')) {
        res.status(400).send('Please use your binus.ac.id email')
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
    const { email, password, dob, binusian, name, campus, gender, profileImage }: User = req.body

    if (!email || !password || !dob || !binusian || !campus || !gender || !profileImage) {
        res.status(400).send('All fields must not be empty')
        return
    }

    if (!email.endsWith('@binus.ac.id')) {
        res.status(400).send('Please use your binus.ac.id email')
        return
    }

    if (password.length < 6) {
        res.status(400).send('Password must be at least 6 characters')
        return
    }

    const encryted_password = encryptPassword(password)

    try {
        const profileImageRef = await uploadImage(`profileImages/${email}.jpg`, profileImage)

        const profileImageUrl = (await getImageDownloadUrl(profileImageRef))[0]

        const userData = {
            dob: dob,
            name: name,
            password: encryted_password,
            binusian: binusian,
            campus: campus,
            gender: gender,
            profileImage: profileImageUrl,
            match: [],
            request: [],
            premium: false
        }


        await firebaseAdmin.db.collection('users').doc(email).set(userData)

        res.status(200).json({ data: 'User registered' })

    } catch (error: any) {
        console.log(error);
        
        res.status(500).send(error.message)
    }
}

async function login(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body

    if (!email || !password) {
        res.status(400).send('Email and password is required')
        return
    }

    try {
        const userSnapshot = await firebaseAdmin.db.collection('users').doc(email).get()

        if (!userSnapshot.exists || !userSnapshot.data()) {
            res.status(404).send('User does not exist')
            return
        }

        const user = userSnapshot.data()! as User
        user.email = email

        if(!comparePassword(password, user.password)) {
            res.status(401).send('Invalid password')
            return
        }

        const token = generateJWTToken(user)

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
        const user = decodeJWTToken(token)
        res.status(200).json({ data: user })
    } catch (error: any) {
        res.status(401).send(error.message)
    }

}

const AuthController = { sendEmailOTP, verifyEmailOTP, register, login, verifyToken }

export default AuthController