import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { createRequestWithToken } from "../utils/requestUtils"

async function sendMessage(message: string, chatRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>) {
    const url = '/message/sendMessage'
    console.log(message);
    console.log(chatRef.path.split('/')[1]);

    const body = {
        message: message,
        chatId: chatRef.path.split('/')[1]
    }

    await createRequestWithToken(url, body)
}

export default function MessageService() {
    return { sendMessage }
}