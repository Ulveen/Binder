import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useCustomTheme, { Theme } from "../../../contexts/ThemeContext";
import UserService from "../../../services/userService";
import TimeService from "../../../services/timeService";
import { Chat } from "../../../services/messageService";

interface Props {
    chatDoc: Chat,
    setChatId: React.Dispatch<React.SetStateAction<string>>
}

const userService = UserService()
const timeService = TimeService()


export default function ChatCard({ chatDoc, setChatId }: Props) {
    const { theme } = useCustomTheme()
    const to = chatDoc.to
    const lastMessage = chatDoc.lastMessage
    const styles = getStyles(theme)

    return (
        <TouchableOpacity style={styles.container} onPress={() => setChatId(chatDoc.chatId)}>
            <Image style={styles.profileImage} source={userService.renderProfileImage(to.profileImage)} />
            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <Text style={styles.name}>{to.name}</Text>
                    <Text style={styles.time}>{timeService.getTimeDiffFormatted(lastMessage.timestamp)}</Text>
                </View>
                <View style={styles.chatDetail}>
                    <Text style={styles.message}>{lastMessage.message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginBottom: 7.5
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    chatContent: {
        flex: 1,
        flexDirection: 'column',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    chatHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        color: theme.text,
        fontStyle: 'italic'
    },
    time: {
        color: theme.text,
    },
    chatDetail: {
        flex: 1,
        flexDirection: 'row',
    },
    message: {
        color: theme.text
    }
})
