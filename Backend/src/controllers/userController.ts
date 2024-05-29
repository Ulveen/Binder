import { Response } from "express";
import User from "../models/User";
import firebaseAdmin from "../firebase/firebase";
import { AuthRequest } from "../middlewares/authMiddleware";
import { encryptPassword } from "../utils/bcryptUtils";
import { getImageDownloadUrl, uploadImage } from "../utils/imageUtils";
import { generateJWTToken } from "../utils/jwtUtils";

async function getPartnerList(req: AuthRequest, res: Response) {
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
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

async function requestPartnerData(req: AuthRequest, res: Response) {
    const { peopleList } = req.body
    try {
        if (!peopleList || peopleList.length < 1) {
            return res.status(404).send('There are no favorites');
        }
        const matchedUser = await Promise.all(peopleList.map(async (mathEmails: string) => {
            const partnerData = await firebaseAdmin.db.collection('users').doc(mathEmails).get()
            if (!partnerData.exists) {
                return null
            }
            return partnerData.data()
        }))
        res.status(200).json({
            favoriteDatas: matchedUser
        })
    } catch (error: any) {
        res.status(500).send(error.message)
    }

}

async function updateUserData(req: AuthRequest, res: Response) {
    const user = req.user as User
    const { name, dob, binusian, campus, gender, profileImage, premium, password } = req.body
    const updatedData = {} as any

    if (name) {
        updatedData['name'] = name
    }
    if (dob) {
        updatedData['dob'] = dob
    }
    if (binusian) {
        updatedData['binusian'] = binusian
    }
    if (campus) {
        updatedData['campus'] = campus
    }
    if (gender) {
        updatedData['gender'] = gender
    }
    if (premium) {
        updatedData['premium'] = premium
    }
    if (password) {
        updatedData['password'] = encryptPassword(password)
    }
    if (profileImage) {
        const profileImageUrl = await uploadImage(`profileImages/${user.email}`, profileImage)
        updatedData['profileImage'] = await getImageDownloadUrl(profileImageUrl)
    }

    await firebaseAdmin.db
        .collection('users')
        .doc(user.email!)
        .update({
            ...updatedData
        })

    const updatedUser = {
        ...user,
        ...updatedData
    }

    const token = generateJWTToken(updatedUser)

    return res.status(200).json({
        data: {
            user: updateUserData,
            token: token
        }
    })
}

async function getUserMatchOption(req: AuthRequest, res: Response) {

}

const userController = { getPartnerList, requestPartnerData, getUserMatchOption, updateUserData }

export default userController;
