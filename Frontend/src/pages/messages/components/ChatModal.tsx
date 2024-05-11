import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Chat from "../../../models/Chat";
import useAuth from "../../../hooks/useAuth";
import useCustomTheme from "../../../hooks/useCustomTheme";
import CustomTheme from "../../../models/CustomTheme";
import useAsyncHandler from "../../../hooks/useAsyncHandler";
import MessageService from "../../../services/messageService";
import { useState } from "react";

interface Props {
    chatDoc: Chat
    currChatId: string
    setcurrChatId: React.Dispatch<React.SetStateAction<string>>
}

const messageService = MessageService()

export default function ChatModal({ chatDoc, currChatId, setcurrChatId }: Props) {
    const { user } = useAuth()
    const { theme } = useCustomTheme()
    const styles = getStyles(theme)

    const [message, setMessage] = useState('')
    
    const {executeAsync: handleSendMessage} = useAsyncHandler(
        async function() {
            if(message === '' || !user) return
            await messageService.sendMessage(user.email, message, chatDoc.chatRef)
        }
    )

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={currChatId !== ''}
            onRequestClose={() => setcurrChatId('')}>
            <TouchableWithoutFeedback onPress={() => setcurrChatId('')}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

function getStyles(theme: CustomTheme) {
    return StyleSheet.create({
        modalContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '30%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            flex: 1,
            backgroundColor: theme.background,
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: 'center',
            elevation: 5,
            width: '100%',
        },
    })
}