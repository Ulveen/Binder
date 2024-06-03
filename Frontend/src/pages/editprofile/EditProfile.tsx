import { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import useAuth from "../../hooks/useAuth";
import useCustomTheme from "../../hooks/useCustomTheme";
import CustomButton from "../../components/CustomButton";
import CustomTheme from "../../models/CustomTheme";
import EditBox from './components/EditBox';
import { openImageGallery, renderProfileImage } from "../../utils/imageUtils";


interface Props {
    navigation: any;
}

export default function Profile({ navigation }: Props) {
    const { user } = useAuth();
    const { theme } = useCustomTheme();

    const styles = getStyles(theme);
    const formattedDob = user?.dob ? new Date(user.dob).toLocaleDateString() : 'Date of Birth not available';

    const [name, setName] = useState(user?.name || '');
    const [dob, setDob] = useState(user?.dob ? new Date(user.dob).toLocaleDateString() : '');
    const [binusian, setBinusian] = useState(user?.binusian || '');
    const [campus, setCampus] = useState(user?.campus || '');

    async function updateData(){
        // try {
        //     const updatedUser = { name, dob, binusian, campus };
        //     const response = await fetch('https://your-backend-url.com/api/updateUserData', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${user.token}`
        //         },
        //         body: JSON.stringify(updatedUser)
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         setUser(data.user);
        //         Alert.alert('Profile updated successfully');
        //         navigation.navigate('Profile');
        //     } else {
        //         const errorData = await response.json();
        //         Alert.alert('Error updating profile', errorData.message);
        //     }
        // } catch (error) {
        //     Alert.alert('Error updating profile', error.message);
        // }
    }

    // async function handlePickImage() {
    //     const assets = await openImageGallery('photo')
    //     if (assets) {
    //         setProfileUri(assets![0].uri!)
    //         setProfileImage(assets![0].base64!)
    //     }
    // }

    const handleBackImgPress = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.backContainer} onPress={handleBackImgPress}>
            <Image source={require("../../assets/back.png")} style={styles.backImg} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        {/* <TouchableOpacity onPress={handleImagePress}> */}
            <Image style={styles.profileImage} source={renderProfileImage(user?.profileImage)} />
        {/* </TouchableOpacity> */}
        <EditBox Label="Name" Info={user?.name} />
        <EditBox Label="Age" Info={formattedDob} />
        <EditBox Label="Binusian" Info={user?.binusian} />
        <EditBox Label="Campus Area" Info={user?.campus} />
        <CustomButton style={styles.button} onPress={updateData}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Done</Text>
        </CustomButton>
    </View>
    );
}

const getStyles = (theme: CustomTheme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        marginTop: 30,
        fontSize: 36,
        fontStyle: "italic",
        color: theme.text,
        fontFamily: "ABeeZee",
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 20,
    },
    button: {
        width: '80%',
        fontSize: 18,
        color: theme.text,
        borderColor: '#E8E6EA',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.text,
        fontWeight: 'bold',
    },
    backContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    backImg: {
        
    },
    upgradeButton: {
        marginTop: 10,
    },
    upgradeText: {
        fontStyle: "italic",
    },
});
