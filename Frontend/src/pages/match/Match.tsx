import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileCards from "./components/ProfileCards";
import useCustomTheme from "../../hooks/useCustomTheme";
import CustomTheme from "../../models/CustomTheme";
import LoadingComponent from "./components/LoadingCards";
import useAuth from "../../hooks/useAuth";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';
import ProfileModal from "./components/ProfileModal";

interface MatchData {
    email: string;
    profilePict: string;
    name: string;
    age: number;
    campus: string;
    binnusian: string;
}

export default function Match({ navigation }: any) {
    const [show, setShow] = useState<string>("match")
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<MatchData[]>([])
    const { user } = useAuth()
    const {theme} = useCustomTheme()
    const styles = getStyles(theme)
    const userService = UserService()
    if (!user) {
        throw new Error('User data is not available');
    } 
    const { email, premium } = user; 
    const toggleShow = () => {
        if (show == "match") {
            setShow('requested')
            setLoading(true)
            // if (premium == true) {
            // } else {
            //     return false
            // }
        } else if (show == "requested") {
            setShow('match')
        }
        return true
    }
    useEffect(() => {
        async function fetchData(type : string) {
            try {
                const parthnerData = await userService.getPartner(email, type);
                setData(parthnerData)
                setLoading(false)
                setRefresh(false)
            } catch (error) {
                console.error('Error fetching parthner data:', error);
            }
        }
      fetchData(show)
    }, [show, refresh])
    
    return (
        <AlertNotificationRoot>
            <ScrollView contentContainerStyle={styles.scrollAblePage}>
                <View style={styles.page}>
                    <Text style={styles.pageTitle}>Matches</Text>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={[styles.option, {
                            backgroundColor : show === "match" ? "#E94057" : "#757575"
                        }]} activeOpacity={1} onPress={toggleShow}>
                            <Text style={styles.optionTitle}>Match</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option, {
                            backgroundColor: show === "match" ? "#ADAFBB" : "#E94057",
                        }]} activeOpacity={1} onPress={() => {
                            const toggledSuccessfully = toggleShow();
                            if (!toggledSuccessfully) {
                                Dialog.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: 'You need to have premium account to use this feature',
                                });
                            }
                        }}>
                            <Text style={styles.optionTitle}>Like You</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={data.length > 0 ? styles.container : {
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                    }}>
                        {loading ? (
                            <>
                                <LoadingComponent />
                                <LoadingComponent />
                                <LoadingComponent />
                                <LoadingComponent />
                                <LoadingComponent />
                                <LoadingComponent />
                            </>
                        ) : (
                            data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <ProfileCards
                                    key={index}
                                    imageLink={item.profilePict}
                                    name={item.name}
                                    navigation={navigation}
                                    show={show}    
                                    userService = {userService}   
                                    useEmail={email}
                                    targetEmail={item.email}  
                                    refresh={setRefresh}    
                                    />
                                ))
                            ) : (
                                <Text>No match yet</Text>
                            )
                        )}
                    </View>
                </View>
            </ScrollView>
            <ProfileModal/>
        </AlertNotificationRoot>
    )
}

const screenWidth = Dimensions.get('window').width
const getStyles = (theme: CustomTheme) => StyleSheet.create({
    scrollAblePage: {
        flexGrow: 1,
    },
    page: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: "center",
    },
    optionContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row"
    },
    option: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: screenWidth * 0.045,
    },
    optionTitle: {
        fontFamily: "ABeeZee",
        fontSize: 17,
        color: "#46131A"
    },
    container: {
        width: "80%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        justifyContent: 'space-between'
    },
    pageTitle: {
        alignSelf: 'flex-start',
        marginLeft : '10%',
        color: theme.text,
        fontSize: 37,
        fontFamily: "ABeeZee",
        marginTop: 15
    }
})