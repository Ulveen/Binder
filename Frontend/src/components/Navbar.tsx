import { Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home/Home";
import Match from "../pages/match";
import Profile from "../pages/profile";
import VideoCall from "../pages/videoCall";
import messages from "../pages/messages";
import useCustomTheme from "../hooks/useCustomTheme";

const BottomTab = createBottomTabNavigator();

export default function Navbar() {
    const { theme } = useCustomTheme();

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('./../assets/home-focus.png')
                            : require('./../assets/home.png');
                    } else if (route.name === 'Match') {
                        iconName = focused
                            ? require('./../assets/match-focus.png')
                            : require('./../assets/match.png');
                    } else if (route.name === 'Video') {
                        iconName = focused
                            ? require('./../assets/video-focus.png')
                            : require('./../assets/video.png');
                    } else if (route.name === 'Messages') {
                        iconName = focused
                            ? require('./../assets/chat-focus.png')
                            : require('./../assets/chat.png');
                    } else if (route.name === 'Profile') {
                        iconName = focused
                            ? require('./../assets/profiles-focus.png')
                            : require('./../assets/profiles.png');
                    }
                    return <Image source={iconName} style={{ width: 50, height: 50 }} />;
                },
                tabBarLabel: () => null
            })}
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
