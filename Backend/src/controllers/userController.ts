import { Response } from "express";
import User from "../models/User";
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

async function getParthnerList(req: AuthRequest, res: Response) {
    const { email }: User = req.body

    try {
        const userDocument = await firebaseAdmin.db.collection('users').doc(email).get()
        if (!userDocument.exists) {
            res.status(404).send('User not found');
            return;
        }
        const userData = userDocument.data() ?? {}
        res.status(200).json({
            match: userData.match,
            favorite: userData.favorite
         })
    } catch (error : any) {
        res.status(500).send(error.message)
    }
}

async function requestParthnerData(req: AuthRequest, res: Response) {
    const { peopleList } = req.body
    try {
        if ( !peopleList || peopleList.length < 1 ) {
            return res.status(404).send('There are no favorites');
        }
        const matchedUser = await Promise.all(peopleList.map(async (mathEmails: string) => {
            const parthnerData = await firebaseAdmin.db.collection('users').doc(mathEmails).get()
            if (!parthnerData.exists) {
                return null
            }
            return parthnerData.data()
        }))
        res.status(200).json({
            favoriteDatas: matchedUser
         })
    } catch (error : any) {
         res.status(500).send(error.message)
    }
    
}

async function getUserMatchOption(req: AuthRequest, res: Response) {
    console.log("Alvin jelek")
}

const userController = { updateProfile, getParthnerList, requestParthnerData, getUserMatchOption }

export default userController;
