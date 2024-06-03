import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { createRequestWithToken } from "../utils/requestUtils"

async function sendMessage(email: string, message: string, chatRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>) {
    const url = '/message/sendMessage'

    const body = {
        email: email,
        message: message,
        chatId: chatRef.path.split('/')[1]
    }

    await createRequestWithToken(url, body)
}

export default function MessageService() {
    return { sendMessage }
}