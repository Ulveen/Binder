import { NextFunction, Request, Response } from "express"
import { User } from "../controllers/authController"; 
import JwtController from "../controllers/jwtController"

export interface AuthRequest extends Request {
    user?: User;
}

function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).send('Token is required')
        return
    }

    try {
        const user = JwtController.decodeToken(token)
        req.user = user
        next()
    } catch (error: any) {
        res.status(401).send('Invalid token')
    }

}

export default verifyToken;