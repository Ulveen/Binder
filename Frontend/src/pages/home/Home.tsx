import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import useAuth from "../../hooks/useAuth";
import UserService from "../../services/userService";
import { getTimeDiffYear } from "../../utils/dateUtils";

interface Props {
    navigation: any;
}

const userService = UserService();

export default function Home({ navigation }: Props) {
    const { user } = useAuth();

    async function getUserMatchOption() {
        await userService.getUserMatchOption(user!);
    }

    // useEffect(() => {
    //     getUserMatchOption();
    // }, [])

    const handleDislike = () => {
        console.log('Disliked');
    };

    const handleLike = () => {
        console.log('Liked');
    };

    const handleFavorite = () => {
        console.log('favvv');
    };

    return (
        <View style={styles.container}>     
            <View style={styles.header}>
                <View style={styles.notifContainer}>
                    <Image source={require("../../assets/Notification.png")} style={styles.leftImg}/>
                </View>
                <View style={styles.filterContainer}>
                    <Image source={require("../../assets/Filter.png")} style={styles.rightImg}/>
                </View>
            </View>

            <View style={styles.listUser}>
                <Image style={styles.profileImage} source={{ uri: user?.profileImage }}/>
                <View style={styles.textContainer}>
                    <Text style={styles.topText}> {user?.name}, {getTimeDiffYear(user?.dob)} </Text>
                    <Text style={styles.botText}> {user?.campus}, Binusian {user?.binusian} </Text>
                </View>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleDislike}>
                    <Image source={require("../../assets/dislike.png")} style={styles.circleImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLike}>
                    <Image source={require("../../assets/like.png")} style={styles.circleImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavorite}>
                    <Image source={require("../../assets/stars.png")} style={styles.circleImage}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        paddingVertical: 30,
    },
    notifContainer: {
        padding: 5,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#E8E6EA",
    },
    leftImg: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    filterContainer: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#E8E6EA",
    },
    rightImg: {
        width: 30,
        height: 30,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listUser: {
        flex: 1,
        alignItems: 'center',
    },
    profileImage: {
        width: 340,
        height: 470,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer:{
        width: 340, 
        height: 80,
        backgroundColor: 'black',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    topText: {
        paddingTop: 15,
        paddingLeft : 20,
        color: 'white',
        fontWeight: 'bold',
    },
    botText: {
        paddingTop: 5,
        paddingLeft : 20,
        color: 'white',
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    circleImage: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
});
