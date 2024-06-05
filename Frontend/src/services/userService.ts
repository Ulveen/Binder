import MatchFilter from "../models/MatchFilter";
import User from "../models/User"
import { createRequest, createRequestWithToken } from "../utils/requestUtils";

async function updateUserData(params: Partial<User>) {
    const to = "/user/updateUserData";
    const body = { ...params };

    const response = await createRequestWithToken(to, body);

    if (response.status === 200) {
        const data = (await response.json()).data;
        return data;
    }

    throw new Error("Error updating user data");
}

async function getUserMatchOption(filter: MatchFilter) {
    const to = "/user/getUserMatchOption";
    const body = {
        ...filter
    }
    const result = await createRequestWithToken(to, body);
    if (result.ok) {
        const data = await result.json()
        return data;
    } else {
        throw new Error("Error getting user match option");
    }
}

async function getParthner(email: string, type: string) {
    const url = '/user/getParthner'
    const body = {
        email: email,
        type: type
    }
    const result = await createRequestWithToken(url, body)
    const data = (await result.json()).match;
    return data
}

async function removeFromMatch(email: string, deleted: string) {
    const url = '/user/removeParthner'
    const body = {
        email: email,
        remove: deleted
    }
    const result = await createRequestWithToken(url, body)
    const data = (await result.json()).match;
    return data
}

async function addToMatch(email: string, add: string) {
    const url = '/user/addToMatch'
    const body = {
        email: email,
        addedEmail: add
    }
    const result = await createRequestWithToken(url, body)
    const data = (await result.json()).match;
    return data
}



export default function UserService() {
    return { updateUserData, getUserMatchOption, getParthner, removeFromMatch, addToMatch }
}