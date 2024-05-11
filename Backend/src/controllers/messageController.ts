import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

async function sendMessage(req: AuthRequest, res: Response) {
    const { message, from, ref }: { message: string, from: string, ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> } = req.body

    if (!message || !from) {
        res.status(400).send('Message is required')
        return
    }

    try {
        await ref.add({
            message: message,
            from: from,
            timestamp: Date.now()
        })

        res.status(200).send('Message sent')

    } catch (error: any) {
        res.status(500).send(error.message)
    }

}

const messageController = {
    sendMessage
}

export default messageController;