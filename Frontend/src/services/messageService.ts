import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { User } from "./authService"

export interface Message {
    message: string
    from: string
    timestamp: Date
}

export interface Chat {
    chatId: string
    to: User
    messages: Message[]
    lastMessage: Message
    chatRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
}