import { View, Text, Button, StyleSheet } from "react-native";
import ModalWrapper from "./ModalWrapper";
import useCustomTheme from "../hooks/useCustomTheme";
import CustomTheme from "../models/CustomTheme";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

interface Props {
    setSwipeLimitModalOpen: (value: boolean) => void
}

export default function SwipeLimitModal({ setSwipeLimitModalOpen }: Props) {
    const { theme } = useCustomTheme()
    const [styles, setStyles] = useState(getStyles(theme))

    function handleCloseModal() {
        setSwipeLimitModalOpen(false)
    }

    useEffect(() => {
        setStyles(getStyles(theme))
    }, [theme])

    return (
        <ModalWrapper handleCloseModal={handleCloseModal}>
            <View style={styles.container}>
                <Text style={styles.title}>Swipe Limit Reached</Text>
                <Text style={styles.message}>You have reached your swipe limit for today. Subscribe to get more swipes!</Text>
                <CustomButton>
                    <Text>Subscribe</Text>
                </CustomButton>
            </View>
        </ModalWrapper>
    )
}

function getStyles(theme: CustomTheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
            padding: 20,
            borderRadius: 20
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10
        },
        message: {
            fontSize: 16,
            marginBottom: 20
        }
    })
}