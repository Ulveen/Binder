import { StyleSheet, View } from "react-native";
import User from "../../../models/User";
import CustomTheme from "../../../models/CustomTheme";
import useCustomTheme from "../../../hooks/useCustomTheme";
import { useEffect, useState } from "react";
import { renderProfileImage } from "../../../utils/imageUtils";
import { getTimeDiffYear } from "../../../utils/dateUtils";
import { Text } from "react-native";
import { Image } from "react-native";

interface Props {
    match: User
}

export default function MatchProfileCard({ match }: Props) {
    const { theme } = useCustomTheme()
    const [styles, setStyles] = useState(getStyles(theme))

    useEffect(() => {
        setStyles(getStyles(theme))
    }, [theme])

    return (
        <View style={styles.listUser}>
            <Image style={styles.profileImage} source={renderProfileImage(match.profileImage)} />
            <View style={styles.textContainer}>
                <Text style={styles.topText}> {match.name}, {getTimeDiffYear(match.dob)} </Text>
                <Text style={styles.botText}> {match.campus}, Binusian {match.binusian} </Text>
            </View>
        </View>
    )
}

function getStyles(theme: CustomTheme) {
    return StyleSheet.create({
        listUser: {
            flex: 1,
            alignItems: 'center',
            marginBottom: 5
        },
        profileImage: {
            width: 340,
            height: 450,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        textContainer: {
            width: 340,
            height: 80,
            backgroundColor: 'black',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        topText: {
            paddingTop: 15,
            paddingLeft: 20,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'ABeeZee'
        },
        botText: {
            paddingTop: 5,
            paddingLeft: 20,
            color: 'white',
            fontSize: 14,
        },
    })
}