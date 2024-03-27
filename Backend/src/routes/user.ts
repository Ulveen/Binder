import userController from 'controllers/userController';
import express from 'express';
import verifyToken from 'middleware/authMiddleware';

const userRouter = express.Router();

userRouter.post('/updateProfile', verifyToken, userController.updateProfile);

export default userRouter;