import { View } from "react-native";
import UserService from "../../services/userService";
import useAuth from "../../hooks/useAuth";

const userService = UserService()

export default function UpdateProfile() {

    const { login } = useAuth()

    async function handleUpdateProfile() {
        const updatedData = await userService.updateUserData({ /* isi user data */ })
        login(updatedData)
    }

    return (
        <View>

        </View>
    )
}