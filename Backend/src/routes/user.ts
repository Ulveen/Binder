import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/authMiddleware';

const UserRouter = express.Router();

UserRouter.post('/updateProfile', verifyToken, userController.updateProfile);
// NOTES : NANTI TAMBAHIN VERIFY TOKEN
UserRouter.get('/getParthner' , userController.getParthnerList);
UserRouter.post('/requestPeople' , userController.requestParthnerData);

export default UserRouter;