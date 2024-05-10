function renderProfileImage(profileImageUri: string | undefined) {
    return profileImageUri ? { uri: profileImageUri } : require('../assets/Profile.jpg')
}

export default function UserService() {
    return { renderProfileImage }
}