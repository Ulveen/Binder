import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomTheme } from '../../models/CustomTheme';

interface ProfileDetailProps {
    title: string;
    content: string | undefined;
    theme: CustomTheme;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ title, content, theme }) => {
    const styles = getProfileDetailStyles(theme);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
        </View>
    );
}

const getProfileDetailStyles = (theme: CustomTheme) => StyleSheet.create({
    container: {
        width: '80%',
        borderColor: '#B0B0B0',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 5,
    },
    content: {
        fontSize: 18,
        color: theme.text,
    },
});

export default ProfileDetail;