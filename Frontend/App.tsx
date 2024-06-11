import { Text } from "react-native";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/AuthContext";
import ThemeProvider from "./src/contexts/ThemeContext";
import useAuth from "./src/hooks/useAuth";
import TabNavigator from "./src/components/TabNavigator";
import StackNavigator from "./src/components/StackNavigator";

function Routes() {
  const { user } = useAuth()

  if (user === undefined)
    return (
      <Text>Loading...</Text>
    )

  if (user === null)
    return (
      <StackNavigator />
    )

  return (
    <TabNavigator />
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
