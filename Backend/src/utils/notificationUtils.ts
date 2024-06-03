import firebaseAdmin from "../firebase/firebase"

export async function addNotification(email: string, message: string) {
    console.log('add notif');
    console.log(email);
    
    
    await firebaseAdmin.db.collection('users')
        .doc(email)
        .collection('notifications')
        .add({
            message: message,
            timestamp: new Date(),
            read: false,
        })
}