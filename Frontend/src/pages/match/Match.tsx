import { ScrollView, StyleSheet, Text, View, useColorScheme } from "react-native";
import useCustomTheme from "../../contexts/ThemeContext";
import ProfileCards from "./components/ProfileCards";

export default function Match() {
    const {colorScheme} = useCustomTheme()
    const styles = getStyles(colorScheme)
    return (
        <ScrollView contentContainerStyle={styles.scrollAblePage}>
            <View style={styles.page}>
                <Text style={styles.pageTitle}>Matches</Text>
                <View style={styles.container}>
                    <ProfileCards ImageLink={"https://i.pinimg.com/736x/7c/46/9a/7c469af6385d49186e233c27bf091c5f.jpg"}></ProfileCards>
                    <ProfileCards ImageLink={"https://i.pinimg.com/736x/7c/46/9a/7c469af6385d49186e233c27bf091c5f.jpg"}></ProfileCards>
                </View>
            </View>
        </ScrollView>
    )
}

const getStyles = (colorScheme: { [key: string]: any }) => StyleSheet.create({
    scrollAblePage: {
        flexGrow: 1,
    },
    page: {
        flex: 1,
        backgroundColor: colorScheme.background,
        alignItems: "center",
    },
    container: {
        width: "80%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        justifyContent: 'space-between'
    },
    pageTitle: {
        alignSelf: 'flex-start',
        marginLeft : '10%',
        color: colorScheme.text,
        fontSize: 37,
        fontFamily: "ABeeZee",
        marginTop: 15
    }
})