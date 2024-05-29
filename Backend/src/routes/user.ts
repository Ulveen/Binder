import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/authMiddleware';

const UserRouter = express.Router();

UserRouter.get('/getParthner' , verifyToken, userController.getPartnerList);
UserRouter.post('/requestPeople', verifyToken , userController.requestPartnerData);
UserRouter.post('/getUserMatchOption', verifyToken, userController.getUserMatchOption);
UserRouter.post('/updateUserData', verifyToken, userController.updateUserData)

export default UserRouter;
