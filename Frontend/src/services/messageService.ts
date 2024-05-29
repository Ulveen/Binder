import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { createRequestWithToken } from "../utils/requestUtils"

async function sendMessage(to: string, message: string, chatRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>) {
    const url = '/message/sendMessage'

    const body = {
        to: to,
        message: message,
        chatId: chatRef.path.split('/')[1]
    }

    await createRequestWithToken(url, body)
}

export default function MessageService() {
    return { sendMessage }
}