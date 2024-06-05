import { ActivityIndicator, StyleSheet, View } from "react-native";
import User from "../../../models/User";
import useCustomTheme from "../../../hooks/useCustomTheme";
import CustomTheme from "../../../models/CustomTheme";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function MatchLoadingSkeleton() {
    const { theme } = useCustomTheme()
    const [styles, setStyles] = useState(getStyles(theme))

    useEffect(() => {
        setStyles(getStyles(theme))
    }, [theme])

    return (
        <View style={styles.listUserLoading}>
            <View style={styles.profileImageLoading}>
                <ActivityIndicator size="large" color={'#E94057'} />
            </View>
            <View style={styles.textContainerLoading}>
                <Text style={styles.topTextLoading}></Text>
                <Text style={styles.botTextLoading}></Text>
            </View>
        </View>
    )
}

function getStyles(theme: CustomTheme) {
    return StyleSheet.create({
        listUserLoading: {
            flex: 1,
            alignItems: 'center',
            marginBottom: 5
        },
        profileImageLoading: {
            width: 340,
            height: 470,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ededed'
        },
        textContainerLoading: {
            width: 340,
            height: 80,
            backgroundColor: 'black',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        topTextLoading: {
            marginTop: 10,
            marginLeft: 10,
            backgroundColor: '#ededed',
            width: '50%',
            height: 30
        },
        botTextLoading: {
            marginTop: 10,
            marginLeft: 10,
            backgroundColor: '#ededed',
            width: '40%',
            height: 20
        },
    })
}