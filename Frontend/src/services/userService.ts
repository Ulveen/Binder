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

async function getUserMatchOption(user: User) {
    const to = "/user/getUserMatchOption";
    const body = {user: user};
    createRequest(to, body);
}

export default function UserService() {
    return { updateUserData, getUserMatchOption }
}