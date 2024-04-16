import { Response } from "express";
import { User } from "./authController";
import firebaseAdmin from "../firebase/firebase";
import { AuthRequest } from "../middlewares/authMiddleware";

async function updateProfile(req: AuthRequest, res: Response) {
    const { email, dob, binusian, campus, gender }: User = req.body

    if (!email || !dob || !binusian || !campus || !gender) {
        res.status(400).send('All fields must not be empty')
        return
    }

    try {
        await firebaseAdmin.db.collection('users').doc(email).set({
            dob: dob,
            binusian: binusian,
            campus: campus,
            gender: gender
        })

        res.status(200).json({ data: 'Profile updated' })

    } catch (error: any) {
        res.status(500).send(error.message)
    }

}

const userController = { updateProfile }

export default userController;