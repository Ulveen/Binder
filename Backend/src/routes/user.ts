import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/authMiddleware';

const UserRouter = express.Router();

UserRouter.post('/updateProfile', verifyToken, userController.updateProfile);
UserRouter.get('/getParthner' , verifyToken, userController.getParthnerList);
UserRouter.post('/requestPeople', verifyToken , userController.requestParthnerData);

export default UserRouter;
