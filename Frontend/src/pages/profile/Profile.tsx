import useCustomTheme from "../../contexts/ThemeContext";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../contexts/AuthContext";
import { Image, StyleSheet, Text, View } from "react-native";
import AuthService from "../../services/authService";
import TimeService from "../../services/timeService";

const authService = AuthService()
const timeService = TimeService()

export default function Profile() {
    const { user, logout } = useAuth()
    const { colorScheme } = useCustomTheme()

    const styles = getStyles(colorScheme)
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Image style={styles.profileImage} source={authService.renderProfileImage(user?.profileImage)} />
            <Text style={styles.profileDetail}>{user?.name}</Text>
            <Text style={styles.profileDetail}>{timeService.getTimeDiffYear(user?.dob)}</Text>
            <Text style={styles.profileDetail}>{user?.binusian}</Text>
            <Text style={styles.profileDetail}>{user?.campus}</Text>
            <CustomButton title="Logout" onPress={logout} />
        </View>
    )
}

const getStyles = (colorScheme: { [key: string]: any }) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorScheme.background,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colorScheme.primary
    },
    profileDetail: {
        fontSize: 24,
        color: colorScheme.text
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 10
    }
})