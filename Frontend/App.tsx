import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Home from "./src/pages/Home";
import Splash from "./src/pages/Splash";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/contexts/authContext";
import AuthMiddleware from "./src/middlewares/AuthMiddleware";

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthMiddleware>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </AuthMiddleware>
      </AuthProvider>
      <Toast />
    </NavigationContainer>
  )


}

export default App;
