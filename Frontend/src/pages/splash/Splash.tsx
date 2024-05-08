import TextButton from "../../components/TextButton";
import useCustomTheme, { Theme } from "../../contexts/ThemeContext";
import { View, StyleSheet, Image } from "react-native";

interface Props {
    navigation: any
}

export default function Splash({ navigation: { navigate } }: Props) {
    const { theme } = useCustomTheme()
    const styles = getStyles(theme)

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/Logo.jpg")} />
            <TextButton bgStyle={[styles.navBtnLogin, styles.navBtn]}
                textStyle={styles.navBtnLoginText}
                title="LOGIN"
                onPress={() => navigate('Login')}
            />
            <TextButton bgStyle={[styles.navBtnRegister, styles.navBtn]}
                textStyle={styles.navBtnRegisterText}
                title="REGISTER"
                onPress={() => navigate('Register')} />
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 15
    },
    navBtn: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center',
    },
    navBtnLogin: {
        backgroundColor: theme.primary
    },
    navBtnLoginText: {
        color: 'white'
    },
    navBtnRegister: {
        backgroundColor: theme.background
    },
    navBtnRegisterText: {
        color: theme.primary
    }
})