import useCustomTheme, { Theme } from "../contexts/ThemeContext";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    title: string
    onPress: () => void
    bgStyle?: { [key: string]: any }
    textStyle?: { [key: string]: any }
}

const getStyles = (theme: Theme) => StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 15,
        padding: 20,
        backgroundColor: theme.primary
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white'
    }
})

export default function TextButton({ title, onPress, bgStyle, textStyle }: Props) {
    const { theme } = useCustomTheme()
    const styles = getStyles(theme)

    return (
        <TouchableOpacity style={[styles.buttonContainer, bgStyle]} onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}