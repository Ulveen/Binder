import User from "../models/User"

function renderProfileImage(profileImageUri: string | undefined) {
    return profileImageUri ? { uri: profileImageUri } : require('../assets/Profile.jpg')
}

function updateUserData(user: User) {
    
}

export default function UserService() {
    return { renderProfileImage }
}