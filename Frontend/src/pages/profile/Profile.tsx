import useCustomTheme, { Theme } from "../../contexts/ThemeContext";
import TextButton from "../../components/TextButton";
import { useAuth } from "../../contexts/AuthContext";
import { Image, StyleSheet, Text, View } from "react-native";
import TimeService from "../../services/timeService";
import UserService from "../../services/userService";

const userService = UserService()
const timeService = TimeService()

export default function Profile() {
    const { user, logout } = useAuth()
    const { theme } = useCustomTheme()

    const styles = getStyles(theme)
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Image style={styles.profileImage} source={userService.renderProfileImage(user?.profileImage)} />
            <Text style={styles.profileDetail}>{user?.name}</Text>
            <Text style={styles.profileDetail}>{timeService.getTimeDiffYear(user?.dob)}</Text>
            <Text style={styles.profileDetail}>{user?.binusian}</Text>
            <Text style={styles.profileDetail}>{user?.campus}</Text>
            <TextButton title="Logout" onPress={logout} />
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.background,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.primary
    },
    profileDetail: {
        fontSize: 24,
        color: theme.text
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 10
    }
})