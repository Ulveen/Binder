export default async function createRequest(url: string, body: Object, method?: string) {
    const to = `${process.env.BACKEND_URL}${url}`
    const headers = { 'Content-Type': 'application/json' }
    console.log(to)
    const result = await fetch(to, {
        method: method || 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })

    if(!result.ok) {
        throw Error(await result.text())
    }

    return result
}