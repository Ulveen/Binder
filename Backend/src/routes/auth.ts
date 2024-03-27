import express from 'express';
import authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/sendEmailOTP', authController.sendEmailOTP);
authRouter.post('/verifyEmailOTP', authController.verifyEmailOTP);
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/verifyToken', authController.verifyToken)

export default authRouter;