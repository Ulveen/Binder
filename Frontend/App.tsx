import { Text } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import useCustomTheme, { ThemeProvider } from "./src/contexts/ThemeContext";
import Home from "./src/pages/home";
import Login from "./src/pages/login";
import Splash from "./src/pages/splash";
import Chat from "./src/pages/chat/Chat";
import Register from "./src/pages/register";
import Match from "./src/pages/match/Match";
import Profile from "./src/pages/profile/Profile";
import VideoCall from "./src/pages/videoCall/VideoCall";

const AuthorizedRoutes = () => {
  const Tab = createBottomTabNavigator()
  const { colorScheme } = useCustomTheme()
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (focused) {
          return <Text style={{ color: colorScheme.primary }}>{route.name}</Text>
        }
        return <Text> {route.name} </Text>
      },
      tabBarLabel: () => null
    })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Match" component={Match} options={{ headerShown: false }} />
      <Tab.Screen name="Video" component={VideoCall} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

const UnauthorizedRoutes = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const Routes = () => {
  const { user } = useAuth()

  if (user === undefined)
    return (
      <Text>Loading...</Text>
    )

  if (user === null)
    return (
      <UnauthorizedRoutes />
    )

  return (
    <AuthorizedRoutes />
  )

}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Routes />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  )

}

export default App;
