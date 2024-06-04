import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import useAuth from "../../hooks/useAuth";
import UserService from "../../services/userService";
import { getTimeDiffYear } from "../../utils/dateUtils";
import { useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/firestore";
import Notification from "../../models/Notification";
import { renderProfileImage } from "../../utils/imageUtils";
import NotificationModal from "./components/NotificationModal";
import CustomTheme from "../../models/CustomTheme";
import useCustomTheme from "../../hooks/useCustomTheme";
import FilterModal from "./components/FilterModal";
import SubscribePopup from "./components/SubscribePopup";

interface Props {
    navigation: any;
}

const userService = UserService();

export default function Home({ navigation }: Props) {
    const { user } = useAuth();
    const { theme } = useCustomTheme()

    const [notificationModalOpen, setNotificationModelOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const styles = getStyles(theme);

    const [filterModalOpen, setFilterModelOpen] = useState(false);
    const [filter, setFilter] = useState({
        gender: user?.gender === 'male' ? 'female' : 'male',
        campus: user?.campus ? user.campus : 'Kemanggisan',
        binusian: user?.binusian ? user.binusian : '26',
        minAge: 17,
        maxAge: 21
    })

    const [subscribePopupOpen, setSubscribePopupOpen] = useState(false);

    async function getUserMatchOption() {
        const matchOptions = await userService.getUserMatchOption(filter);
    }

    function handleOpenFilterModal() {
        if (notificationModalOpen) return
        setFilterModelOpen(true);
    }

    function handleOpenNotificationModal() {
        if (filterModalOpen) return
        setNotificationModelOpen(true);
    }

    function handleShowSubscribePopup() {
        setSubscribePopupOpen(true);
    }

    useEffect(() => {
        getUserMatchOption();
        const subscriber = firebase
            .firestore()
            .collection('users')
            .doc(user?.email)
            .collection('notifications')
            .where('read', '==', false)
            .onSnapshot((snapshot) => {
                const notifications: Notification[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    notifications.push({
                        id: doc.id,
                        message: data.message,
                        timestamp: new Date(data.timestamp.seconds * 1000),
                        read: data.read,
                    } as Notification);
                });
                setNotifications(notifications);
            })
        return () => subscriber();
    }, [])

    const handleDislike = () => {

    };

    const handleLike = () => {

    };

    const handleFavorite = () => {

    };

    return (
        <View style={styles.container}>
            {subscribePopupOpen &&
                <SubscribePopup />
            }
            {filterModalOpen &&
                <FilterModal setFilterModalOpen={setFilterModelOpen} filter={filter} setFilter={setFilter} />
            }
            {notificationModalOpen &&
                <NotificationModal setNotificationModelOpen={setNotificationModelOpen} notifications={notifications} />
            }
            <View style={styles.header}>
                <TouchableOpacity style={styles.notifContainer} onPress={handleOpenNotificationModal}>
                    <Image source={require("../../assets/Notification.png")} style={styles.leftImg} />
                    {notifications.length > 0 &&
                        <Text style={styles.notificationIndicator}>{notifications.length}</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterContainer} onPress={handleOpenFilterModal}>
                    <Image source={require("../../assets/Filter.png")} style={styles.rightImg} />
                </TouchableOpacity>
            </View>

            <View style={styles.listUser}>
                <Image style={styles.profileImage} source={renderProfileImage(user?.profileImage)} />
                <View style={styles.textContainer}>
                    <Text style={styles.topText}> {user?.name}, {getTimeDiffYear(user?.dob)} </Text>
                    <Text style={styles.botText}> {user?.campus}, Binusian {user?.binusian} </Text>
                </View>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleDislike}>
                    <Image source={require("../../assets/dislike.png")} style={styles.circleImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLike}>
                    <Image source={require("../../assets/like.png")} style={styles.circleImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavorite}>
                    <Image source={require("../../assets/stars.png")} style={styles.circleImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function getStyles(theme: CustomTheme) {
    return StyleSheet.create({
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
            position: 'relative',
            padding: 5,
            borderWidth: 2,
            borderRadius: 15,
            borderColor: "#E8E6EA",
        },
        notificationIndicator: {
            position: 'absolute',
            bottom: -5,
            right: -5,
            backgroundColor: theme.primary,
            color: 'white',
            borderRadius: 10,
            width: 20,
            height: 20,
            textAlign: 'center',
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
        },
        botText: {
            paddingTop: 5,
            paddingLeft: 20,
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
    })
}
