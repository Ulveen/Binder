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
    const user = req.user as User extends { exp: number, iat: number } ? User : User & { exp: number, iat: number }
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
        updatedData['profileImage'] = (await getImageDownloadUrl(profileImageUrl))[0]
    }

    await firebaseAdmin.db
        .collection('users')
        .doc(user.email!)
        .update({
            ...updatedData
        })

    const { exp, iat, ...userWithoutExpIat } = user;
    const updatedUser = {
        ...userWithoutExpIat,
        ...updatedData,
    };

    const expString = ((exp * 1000 - Date.now()) / 3600000).toPrecision(6).toString() + 'h';

    const token = generateJWTToken({ ...updatedUser }, expString);

    return res.status(200).json({
        data: {
            user: updatedUser,
            token: token
        }
    })
}

async function getUserMatchOption(req: AuthRequest, res: Response) {
    const user = req.user as User
    const { gender, campus, binusian, minAge, maxAge } = req.body

    console.log(gender, campus, binusian, minAge, maxAge);


    const collection = firebaseAdmin.db.collection('users')

    const userMatchOptions = await collection
        .limit(20)
        .where('gender', '==', gender)
        .get()

    try {
        const filteredMatchOptions = userMatchOptions.docs
            .filter(doc => {
                const data = doc.data() as any
                const age = new Date().getFullYear() - new Date(data.dob).getFullYear()
                data.email = doc.id

                return data.email !== user.email &&
                    data.campus === campus &&
                    data.binusian === binusian &&
                    age >= minAge &&
                    age <= maxAge
            })
            .map(doc => doc.data())

        console.log(filteredMatchOptions);

        res.status(200).json({
            userMatchOptions: filteredMatchOptions
        })
    } catch (error: any) {
        res.status(500).send(error.message)
    }

}

const userController = { getPartnerList, requestPartnerData, getUserMatchOption, updateUserData }

export default userController;
