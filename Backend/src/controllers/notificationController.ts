import { Response } from "express"
import { AuthRequest } from "../middlewares/authMiddleware"
import firebaseAdmin from "../firebase/firebase"

async function markAllAsRead(req: AuthRequest, res: Response) {
    const { notificationIds } = req.body
    const collection = firebaseAdmin.db.collection('users').doc(req.user?.email!).collection('notifications')

    await Promise.all(
        notificationIds.map(async (notificationId: string) => {
            await collection.doc(notificationId).update({ read: true })
        })
    )
}

const NotificationController = { markAllAsRead }

export default NotificationController