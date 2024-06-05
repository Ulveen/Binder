import { Response } from "express";
import User from "../models/User";
import firebaseAdmin from "../firebase/firebase";
import { AuthRequest } from "../middlewares/authMiddleware";
import { encryptPassword } from "../utils/bcryptUtils";
import { getImageDownloadUrl, uploadImage } from "../utils/imageUtils";
import { generateJWTToken } from "../utils/jwtUtils";
import { differenceInYears, parseISO } from "date-fns";


async function getPartnerList(req: AuthRequest, res: Response) {
    
    interface ExtendedUser extends User {
        type : string;
    }
   
    const { email, type }: ExtendedUser = req.body

    const calculateAge = (dob: string): number => {
        const birthDate = parseISO(dob);
        return differenceInYears(new Date(), birthDate);
    };

    try {
        let parthner = null

        const userDocument = await firebaseAdmin.db.collection('users').doc(email).get()

        if (!userDocument.exists) {
            res.status(404).send('User not found');
            return;
        }
        
        const userData = userDocument.data() ?? {}
        if (type == "match") {
            parthner = userData.match
        } else if (type == "requested") {
            parthner = userData.request
        } else { 
            res.status(400).json({ message: 'Unknown request type' });
            return;
        }

        const MatchList = async  () => {
             const matchPromises = parthner.map(async (email: any) => {
                 const partnerDocument = await firebaseAdmin.db.collection('users').doc(email).get();
                 const data =  partnerDocument.data() ?? {}
                 return {
                     email : email,
                     name: data.name,
                     kampus: data.campus,
                     binusian: data.binusian,
                     profilePict: data.profileImage,
                     age: calculateAge(data.dob)
                };
            });

            return Promise.all(matchPromises);
        }
        const matchList = await MatchList()

        res.status(200).json({
            match: matchList
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

async function addToMatch(req: AuthRequest, res: Response) {
    const { email, addedEmail } = req.body
    const userRef = firebaseAdmin.db.collection('users').doc(email);

    try {
        await userRef.update({
            match: firebaseAdmin.admin.firestore.FieldValue.arrayUnion(addedEmail),
            request: firebaseAdmin.admin.firestore.FieldValue.arrayRemove(addedEmail)
        });
        res.status(200).send('Added email to match field successfully');
    } catch (error) {
        console.error('Error updating match field:', error);
        res.status(500).send('Error updating match field');
    }
}

async function removeParthner(req: AuthRequest, res: Response) {
    const { email, remove } = req.body
    const userRef = firebaseAdmin.db.collection('users').doc(email);

    try {
        await userRef.update({
            match: firebaseAdmin.admin.firestore.FieldValue.arrayRemove(remove),
            request: firebaseAdmin.admin.firestore.FieldValue.arrayRemove(remove)
        });
        res.status(200).send('Email remove successfuly');
    } catch (error) {
        console.error('Error updating match field:', error);
        res.status(500).send('Error updating match field');
    }
}



async function getUserMatchOption(req: AuthRequest, res: Response) {

}

const userController = { getPartnerList, getUserMatchOption, updateUserData, addToMatch , removeParthner}

export default userController;
