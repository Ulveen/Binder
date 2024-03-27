import { useNavigation, useNavigationState } from "@react-navigation/native"
import { useAuth } from "../contexts/authContext"
import { useEffect, useState } from "react"
import { Text } from "react-native"

interface Props {
    children: JSX.Element,
}

export default function AuthMiddleware({ children }: Props) {
    const navigation = useNavigation()
    const { user } = useAuth()

    const state = useNavigationState(state => {
        if(!state) return ''
        return state.routes[state.index].name
    })
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false)
            if (
                state === '/Login'&& 
                user) {
                navigation.navigate('Home')
            } else if (user === null 
                && state !== '/Login'
                ) {
                navigation.navigate('Login')
            }
        } else {
            setLoading(true)
        }
    }, [user, 
        state
    ])

    if (loading)
        return  <Text>Loading</Text>

    return <>{children}</>

}