import { View } from "react-native";
import firestore from '@react-native-firebase/firestore';

const messages = firestore().collection('messages')

export default function Chat() {
    return (
        <View>
            
        </View>
    )
}