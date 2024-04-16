import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/authMiddleware';

const UserRouter = express.Router();

UserRouter.post('/updateProfile', verifyToken, userController.updateProfile);

export default UserRouter;