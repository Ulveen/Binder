import CustomButton from "../../components/CustomButton";
import useCustomTheme from "../../contexts/ThemeContext";
import { View, StyleSheet, Image } from "react-native";

interface Props {
    navigation: any
}

const getStyles = (colorScheme: { [key: string]: any }) => StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colorScheme.background
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 15
    },
    navBtn: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center'
    },
    navBtnLogin: {
        backgroundColor: colorScheme.primary
    },
    navBtnLoginText: {
        color: 'white'
    },
    navBtnRegister: {
        backgroundColor: colorScheme.background
    },
    navBtnRegisterText: {
        color: colorScheme.primary
    }
})

export default function Splash({ navigation }: Props) {
    const { colorScheme } = useCustomTheme()
    const styles = getStyles(colorScheme)

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/Logo.jpg")} />
            <CustomButton bgStyle={[styles.navBtnLogin, styles.navBtn]}
                textStyle={styles.navBtnLoginText}
                title="LOGIN"
                onPress={() => { navigation.navigate('Login') }}
            />
            <CustomButton bgStyle={[styles.navBtnRegister, styles.navBtn]}
                textStyle={styles.navBtnRegisterText}
                title="REGISTER"
                onPress={() => { navigation.navigate('Register') }} />
        </View>
    )
}