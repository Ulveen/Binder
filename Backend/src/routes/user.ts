import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/authMiddleware';

const UserRouter = express.Router();

UserRouter.post('/getParthner', verifyToken , userController.getPartnerList);
UserRouter.post('/getUserMatchOption', verifyToken, userController.getUserMatchOption);
UserRouter.post('/addToMatch', verifyToken, userController.addToMatch);
UserRouter.post('/removeParthner', verifyToken, userController.removeParthner);
UserRouter.post('/updateUserData', verifyToken, userController.updateUserData)

export default UserRouter;
