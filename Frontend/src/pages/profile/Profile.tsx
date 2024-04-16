import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../contexts/AuthContext";
import { View } from "react-native";

export default function Profile() {

    const {logout} = useAuth()

    return (
        <View>
            <CustomButton title="Logout" onPress={logout}/>
        </View>
    )
}