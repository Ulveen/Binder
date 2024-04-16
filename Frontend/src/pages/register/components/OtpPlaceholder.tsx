import useCustomTheme from "../../../contexts/ThemeContext"
import { StyleSheet, Text } from "react-native"

interface Props {
    code: string,
    openInput: () => void
}

const getStyles = (colorScheme: {[key: string]: any}) => StyleSheet.create({
    container: {
        borderColor: colorScheme.text,
        borderWidth: 1,
        borderRadius: 5,
        width: 70,
        height: 70,
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colorScheme.text
    }
})

export default function OtpPlaceholder({ code, openInput }: Props) {
    const { colorScheme } = useCustomTheme()

    const styles = getStyles(colorScheme)

    return (
        <Text style={styles.container} onPress={openInput}>
            {code}
        </Text>
    )
}