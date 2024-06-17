import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import useCustomTheme from "../../../hooks/useCustomTheme";
import CustomTheme from "../../../models/CustomTheme";

export default function TextHolder({UserInfo, TextLabel}: any){
    const { theme } = useCustomTheme();

    const styles = getStyles(theme);
    return (
        <View style={styles.viewHolder}>
            <Text style={styles.label}>{TextLabel}</Text>
            <Text style={styles.profileDetail}>{UserInfo}</Text>
        </View>
    )
}

const screenWidth = Dimensions.get('window').width
const getStyles = (theme: CustomTheme) => StyleSheet.create({
    profileDetail: {
        width: '100%',
        fontSize: screenWidth * 0.045, // Menggunakan 4.5% dari lebar layar untuk ukuran font
        color: theme.text,
        borderColor: '#B0B0B0',
        borderWidth: 1,
        padding: screenWidth * 0.025, // Menggunakan 2.5% dari lebar layar untuk padding
        paddingLeft: screenWidth * 0.037, // Menggunakan 3.7% dari lebar layar untuk padding kiri
        borderRadius: screenWidth * 0.025, // Menggunakan 2.5% dari lebar layar untuk border radius
        marginVertical: screenWidth * 0.042, // Menggunakan 4.2% dari lebar layar untuk margin vertikal
        textAlign: 'left',
        marginBottom: screenWidth * 0.063, // Menggunakan 6.3% dari lebar layar untuk margin bawah,
        fontFamily: 'ABeeZee'
    },
    viewHolder: {
        width: '80%',
        alignItems: 'flex-start',
        gap: 5
    },
    label: {
        textAlign: 'left',
        marginBottom: screenWidth *-0.05,
        paddingLeft: screenWidth *0.017,
        color: 'gray',
        fontFamily: 'ABeeZee'
    },

})