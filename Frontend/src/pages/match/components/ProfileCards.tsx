import { BlurView } from "@react-native-community/blur";
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

export default function MyComponent({ ImageLink , Name, Status}: any) {
    console.log(ImageLink)
    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => {
            // Function Sementara
            console.log("Bro memencet jodohnya")
        }}>
            <ImageBackground
                source={{ uri: ImageLink }}
                style={styles.card}>
            </ImageBackground>
        </TouchableOpacity>
    )
}
// ini kita pengen cari width nya, tujuannya pengen pake semacam vw
const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.385,
        height: screenWidth * 0.55,
        overflow: 'hidden',
        borderRadius: screenWidth * 0.055
    },
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: "red"
    }
})
