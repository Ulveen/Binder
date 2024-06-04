import jwt from "jsonwebtoken"
import User from "../models/User"

export function generateJWTToken(user: User, expiresIn: string = '24h') {
    return jwt.sign(user, process.env.SECRET_KEY!, { expiresIn: expiresIn })
}

export function decodeJWTToken(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY!) as User
}