import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home/Home";
import Match from "../pages/match";
import Profile from "../pages/profile";
import VideoCall from "../pages/videoCall";
import messages from "../pages/messages";
import useCustomTheme from "../hooks/useCustomTheme";

const BottomTab = createBottomTabNavigator()

export default function Navbar() {
    const { theme } = useCustomTheme()
    return (
        <BottomTab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {

                        } else if (route.name === 'Match') {

                        } else if (route.name === 'Video') {

                        } else if (route.name === 'Messages') {

                        } else if (route.name === 'Profile') {

                        }
                        if (focused) {
                            return <Text style={{ color: theme.primary }}>{route.name}</Text>;
                        } else {
                            return <Text>{route.name}</Text>;
                        }
                    },
                    tabBarLabel: () => null
                })
            }
            initialRouteName="Home"
        >
            <BottomTab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <BottomTab.Screen name="Match" component={Match} options={{ headerShown: false }} />
            <BottomTab.Screen name="Video" component={VideoCall} options={{ headerShown: false }} />
            <BottomTab.Screen name="Messages" component={messages} options={{ headerShown: false }} />
            <BottomTab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </BottomTab.Navigator>
    );
}