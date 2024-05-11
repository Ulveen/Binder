import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import useCustomTheme, { Theme } from "../../../contexts/ThemeContext";
import Chat from "../../../models/Chat";
import { useAuth } from "../../../contexts/AuthContext";

interface Props {
    chatDoc: Chat
    currChatId: string
    setcurrChatId: React.Dispatch<React.SetStateAction<string>>
}

export default function ChatModal({ chatDoc, currChatId, setcurrChatId }: Props) {
    const { user } = useAuth()
    const { theme } = useCustomTheme()
    const styles = getStyles(theme)

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

function getStyles(theme: Theme) {
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