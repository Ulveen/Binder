import { View, Text, Button, StyleSheet } from "react-native";
import AuthService from "../services/authService";
import { useAuth } from "contexts/authContext";

interface Props {
    navigation: any;
}

export default function Home({ navigation }: Props) {
    const auth = useAuth()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button title="Logout" onPress={auth.logout} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})