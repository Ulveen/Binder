import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Home from "./src/pages/Home";
import Splash from "./src/pages/Splash";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./src/contexts/authContext";
import { Text } from "react-native";

const Stack = createNativeStackNavigator()

const Structure = () => {
  const { user } = useAuth()

  if (user === undefined)
    return <Text>Loading...</Text>

  if (user === null)
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    )

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )

}

function App() {
  return (
    <AuthProvider>
      <Structure />
    </AuthProvider>
  )

}

export default App;
