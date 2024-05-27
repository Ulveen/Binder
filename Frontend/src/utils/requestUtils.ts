import AsyncStorage from "@react-native-async-storage/async-storage"

export async function createRequest(url: string, body: Object, method?: string) {
    const to = `${process.env.BACKEND_URL}${url}`
    const headers = { 'Content-Type': 'application/json' }
    const result = await fetch(to, {
        method: method || 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })

    if (!result.ok) {
        throw Error(await result.text())
    }

    return result
}

export async function createRequestWithToken(url: string, body: Object, method?: string) {
    const to = `${process.env.BACKEND_URL}${url}`
    const token = await AsyncStorage.getItem('authorization') as string
    const headers = {
        'Content-Type': 'application/json',
        'authorization': token
    }

    const result = await fetch(to, {
        method: method || 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    
    if (!result.ok) {
        throw Error(await result.text())
    }

    return result
}