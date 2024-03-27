import { View, Text, StyleSheet, Button } from "react-native";

interface Props {
    navigation: any
}

export default function Splash( {navigation} : Props ) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BINDER</Text>
            <Button title="Login" onPress={()=>{navigation.navigate('Login')}}/>
            <Button title="Register" onPress={()=>{navigation.navigate('Register')}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})