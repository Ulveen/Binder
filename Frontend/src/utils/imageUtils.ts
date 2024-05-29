import { launchImageLibrary } from "react-native-image-picker"

export function renderProfileImage(profileImageUri: string | undefined) {
    return profileImageUri ? { uri: profileImageUri } : require('../assets/Profile.jpg')
}

export async function openImageGallery(mediaType: 'photo' | 'video' | 'mixed') {
    const response = await launchImageLibrary({ mediaType: mediaType, includeBase64: true })
    if (response.didCancel) return null
    return response.assets
}