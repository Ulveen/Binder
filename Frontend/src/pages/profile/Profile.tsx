import { useEffect } from "react";
import { BackHandler, View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import useAuth from "../../hooks/useAuth";
import useCustomTheme from "../../hooks/useCustomTheme";
import CustomTheme from "../../models/CustomTheme";
import TextHolder from "./components/TextHolder";
import { renderProfileImage } from "../../utils/imageUtils";

interface Props {
    navigation: any;
}

export default function Profile({ navigation }: Props) {
    const { user, logout } = useAuth();
    const { theme } = useCustomTheme();

    const styles = getStyles(theme);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Home'); // Navigasi kembali ke halaman Home
            return true; // Kembalikan true untuk menonaktifkan default behavior
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Hapus listener saat komponen tidak lagi digunakan
    }, [navigation]);

    const handleEdit = () => {
        navigation.navigate('EditProfile');
    };

    const formattedDob = user?.dob ? new Date(user.dob).toLocaleDateString() : 'Date of Birth not available';

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
            <Image style={styles.profileImage} source={renderProfileImage(user?.profileImage)} />
            <TextHolder UserInfo={user?.name} TextLabel={"Name"}></TextHolder>
            <TextHolder UserInfo={formattedDob} TextLabel={"Date of Birth"} />
            <TextHolder UserInfo={user?.binusian} TextLabel={"Binusian"}></TextHolder>
            <TextHolder UserInfo={user?.campus} TextLabel={"Campus Area"}></TextHolder>
            <TextHolder UserInfo TextLabel={"Interested in"}></TextHolder>
            <CustomButton style={[styles.button]} onPress={logout}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Logout</Text>
            </CustomButton>
            <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeText}>Upgrade to Premium</Text>
            </TouchableOpacity>
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
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.text,
        fontWeight: 'bold',
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: theme.primary,
        borderColor: '#E8E6EA',
        borderWidth: 1,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
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
