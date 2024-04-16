import { View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
    navigation: any;
}

export default function Home({ navigation }: Props) {
    const { logout } = useAuth()

    return (
        <View>

        </View>
    )
}