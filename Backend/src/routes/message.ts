import express from 'express';
import verifyToken from '../middlewares/authMiddleware';
import messageController from '../controllers/messageController';

const MessageRouter = express.Router();

MessageRouter.post('/sendMessage', verifyToken, messageController.sendMessage);

export default MessageRouter;
