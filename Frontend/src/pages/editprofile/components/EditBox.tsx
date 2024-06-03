import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import useCustomTheme from "../../../hooks/useCustomTheme";
import CustomTheme from "../../../models/CustomTheme";

export default function editBox({ Label, Info }: any){
    const { theme } = useCustomTheme();

    const styles = getStyles(theme);
    return (
        <View style={styles.viewHolder}>
            <Text style={styles.label}>{Label}</Text>
            <TextInput style={styles.profileDetail}>{Info}</TextInput>
        </View>
    )
}

const screenWidth = Dimensions.get('window').width
const getStyles = (theme: CustomTheme) => StyleSheet.create({
    profileDetail: {
        width: '100%',
        fontSize: screenWidth * 0.045,
        color: theme.text,
        borderColor: '#B0B0B0',
        borderWidth: 1,
        padding: screenWidth * 0.025,
        paddingLeft: screenWidth * 0.037,
        borderRadius: screenWidth * 0.025,
        marginVertical: screenWidth * 0.042,
        textAlign: 'left',
        marginBottom: screenWidth * 0.063,
    },
    viewHolder: {
        width: '80%',
        alignItems: 'flex-start',
    },
    label: {
        textAlign: 'left',
        marginBottom: screenWidth * -0.03,
        paddingLeft: screenWidth * 0.017,
    },

})