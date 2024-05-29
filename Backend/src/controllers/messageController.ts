import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import firebaseAdmin from "../firebase/firebase";
import { addNotification } from "../utils/notificationUtils";

async function createMessageChannel(req: AuthRequest, res: Response) {
    const { to }: { to: string } = req.body()
    const user = req.user

    const collectionRef = firebaseAdmin.db.collection('messages')

    const result = await collectionRef.add({
        users: [to, user?.email],
        lastMessage: {
            from: user?.email,
            message: '',
            timeStamp: new Date()
        },
    })

    await result
        .collection('messages')
        .doc('init')
        .set({})
}

async function sendMessage(req: AuthRequest, res: Response) {
    const { to, message, chatId }: { to: string, message: string, chatId: string } = req.body

    if (!message || !chatId) {
        res.status(400).send('Message and chat id is required')
        return
    }

    const chatMessagesRef = firebaseAdmin.db.collection('messages').doc(chatId).collection('messages')

    try {
        const sendMessagePromise = chatMessagesRef.add({
            message: message,
            from: req.user?.email,
            timestamp: Date.now()
        })

        const updateLastMessagePromise = firebaseAdmin.db.collection('messages').doc(chatId).update({
            lastMessage: {
                from: req.user?.email,
                message: message,
                timestamp: Date.now()
            }
        })

        await Promise.all([sendMessagePromise, updateLastMessagePromise]).then(() => {
            addNotification(to, `New message from ${req.user?.email}`)
        })

        res.status(200).send('Message sent')
    } catch (error: any) {
        res.status(500).send(error.message)
    }

}

const messageController = {
    sendMessage, createMessageChannel
}

export default messageController;