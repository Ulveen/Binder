import MatchFilter from "../models/MatchFilter";
import User from "../models/User"
import { createRequest, createRequestWithToken } from "../utils/requestUtils";

async function updateUserData(params: Partial<User>) {
    const to = "/user/updateUserData";
    const body = {...params};
    
    const response = await createRequestWithToken(to, body);

    if(response.status === 200) {
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
    // await createRequest(to, body);
}

export default function UserService() {
    return { updateUserData, getUserMatchOption }
}