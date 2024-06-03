import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import UserService from "../../services/userService";
import useAuth from "../../hooks/useAuth";
import CustomTheme from "../../models/CustomTheme";
import useCustomTheme from "../../hooks/useCustomTheme";

interface Props {
    navigation: any;
}

const userService = UserService()

export default function UpdateProfile({ navigation: { navigate } }: Props) {
    const { theme } = useCustomTheme();
    const styles = getStyles(theme);

    const { login } = useAuth()
    
    function handleBack() {
        navigate('Profile')
    }

    async function handleUpdateProfile({ navigation: { navigate } }: Props) {
        const updatedData = await userService.updateUserData({ /* isi user data */ })
        login(updatedData)
    }

    return (
        <View>
            <TouchableOpacity style={styles.backContainer} onPress={handleBack}>
                <Image source={require("../../assets/back.png")} />
            </TouchableOpacity>
        </View>
    )
}

const getStyles = (theme: CustomTheme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    backContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
});
