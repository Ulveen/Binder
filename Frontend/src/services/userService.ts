import User from "../models/User"
import { createRequest } from "../utils/requestUtils";

function renderProfileImage(profileImageUri: string | undefined) {
    return profileImageUri ? { uri: profileImageUri } : require('../assets/Profile.jpg')
}

function updateUserData(user: User) {
    
}

async function getUserMatchOption(user: User) {
    const to = "/user/getUserMatchOption";
    const body = {user: user};
    createRequest(to, body);
}

export default function UserService() {
    return { renderProfileImage, getUserMatchOption }
}