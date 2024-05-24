import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home/Home";
import Match from "../pages/match";
import Profile from "../pages/profile";
import VideoCall from "../pages/videoCall";
import messages from "../pages/messages";

const BottomTab = createBottomTabNavigator();

export default function Navbar() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = focused
                                ? require('./../assets/home-focus.png')
                                : require('./../assets/home.png');
                            break;
                        case 'Match':
                            iconName = focused
                                ? require('./../assets/match-focus.png')
                                : require('./../assets/match.png');
                            break;
                        case 'Video':
                            iconName = focused
                                ? require('./../assets/video-focus.png')
                                : require('./../assets/video.png');
                            break;
                        case 'Messages':
                            iconName = focused
                                ? require('./../assets/chat-focus.png')
                                : require('./../assets/chat.png');
                            break;
                        case 'Profile':
                            iconName = focused
                                ? require('./../assets/profiles-focus.png')
                                : require('./../assets/profiles.png');
                            break;
                    }
                    return <Image source={iconName} style={{ width: 50, height: 50 }} />;
                },
                tabBarLabel: () => null
            })}
            initialRouteName="Home">
            <BottomTab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <BottomTab.Screen name="Match" component={Match} options={{ headerShown: false }} />
            <BottomTab.Screen name="Video" component={VideoCall} options={{ headerShown: false }} />
            <BottomTab.Screen name="Messages" component={messages} options={{ headerShown: false }} />
            <BottomTab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </BottomTab.Navigator>
    );
}
