import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileModal({ limit }: { limit: number }) {
    return (
        <Modal animationType="slide" transparent={false} visible={true}>
            <View style={styles.modalContainer}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    <Text>Your modal content here</Text>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    scrollView: {
        maxHeight: 300, // Set your desired maximum height here
        width: '90%', // Adjust as needed
        backgroundColor: 'white', // Adjust as needed
        borderRadius: 10, // Adjust as needed
        padding: 20, // Adjust as needed
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
