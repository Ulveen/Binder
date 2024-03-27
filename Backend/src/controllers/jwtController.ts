import jwt from "jsonwebtoken"
import { User } from "./authController"

function generateToken(user: User) {
    return jwt.sign(user, process.env.SECRET_KEY!, { expiresIn: '24h' })
}

function decodeToken(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY!) as User
}

const JwtController = { generateToken, decodeToken }
export default JwtController