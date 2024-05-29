import User from "../models/User"
import { createRequest } from "../utils/requestUtils";

function updateUserData(user: User) {
    
}

async function getUserMatchOption(user: User) {
    const to = "/user/getUserMatchOption";
    const body = {user: user};
    createRequest(to, body);
}

export default function UserService() {
    return { getUserMatchOption }
}