import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Chat } from "../../services/messageService";
import { User } from "../../services/authService";
import ChatCard from "./components/ChatCard";
import useCustomTheme, { Theme } from "../../contexts/ThemeContext";
import ChatModal from "./components/ChatModal";

export default function Messages() {
    const { theme } = useCustomTheme()
    const styles = getStyles(theme)

    const { user } = useAuth()

    const messageCollectionRef = firestore()
        .collection('messages')
        .where('users', 'array-contains', user?.email)

    const [search, setSearch] = useState('')
    const [chatDocs, setChatDocs] = useState<Chat[]>([])
    const [currChatId, setCurrChatId] = useState<string>('')

    async function getChats() {
        try {
            messageCollectionRef.onSnapshot(async (querySnapshot) => {
                const promises: Promise<Chat | undefined>[] = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    const toEmail = data.users[0] === user?.email ? data.users[1] : data.users[0];

                    async function fetchUser() {
                        const userDoc = await firestore().collection('users').doc(toEmail).get();
                        if (userDoc.exists) {
                            return {
                                chatId: doc.id,
                                chatRef: doc.ref,
                                to: userDoc.data() as User,
                                messages: data.messages,
                                lastMessage: {
                                    message: data.lastMessage.message,
                                    from: data.lastMessage.from,
                                    timestamp: data.lastMessage.timestamp.toDate()
                                }
                            } as Chat
                        }
                    };

                    promises.push(fetchUser());
                });

                const resolvedChatDocs = await Promise.all(promises);
                const chats = resolvedChatDocs.filter((chatDoc) => chatDoc !== undefined) as Chat[];
                setChatDocs(chats
                    .sort((a, b) => a.lastMessage.timestamp.getTime() - b.lastMessage.timestamp.getTime())
                );
            })
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    useEffect(() => {
        getChats()
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.topBar}>
                <TextInput placeholder="Search" value={search} onChangeText={setSearch} style={styles.searchBar}>

                </TextInput>
            </View>

            <View style={styles.chatList}>
                <Text style={styles.subtitle}>Messages</Text>
                <ScrollView style={styles.chatScrollView}>
                    {chatDocs.filter(chat => chat.to.name.includes(search)).map((chatDoc) => {
                        return (
                            <ChatCard chatDoc={chatDoc} setChatId={setCurrChatId} key={chatDoc.chatId} />
                        )
                    })}
                </ScrollView>
            </View>
            <ChatModal chatDoc={chatDocs.find(chat => chat.chatId === currChatId)!} currChatId={currChatId} setcurrChatId={setCurrChatId} />
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: theme.text
    },
    topBar: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingVertical: 5,
        gap: 10,
    },
    searchBar: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: theme.text
    },
    chatList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingVertical: 5,
        gap: 5
    },
    chatScrollView: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
})