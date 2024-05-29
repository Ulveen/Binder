import jwt from "jsonwebtoken"
import User from "../models/User"

export function generateJWTToken(user: User) {
    return jwt.sign(user, process.env.SECRET_KEY!, { expiresIn: '24h' })
}

export function decodeJWTToken(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY!) as User
}