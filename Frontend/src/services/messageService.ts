import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import createRequest from "./fetchService"

async function sendMessage(from: string, message: string, chatRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>) {
    const url = '/messages/sendEmailOTP'
    const body = { from: from, message: message, chatRef: chatRef}

    await createRequest(url, body)
}

export default function MessageService() {
    return { sendMessage }
}