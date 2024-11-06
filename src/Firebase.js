import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "YOUR_API KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET_ADDRESS",
    messagingSenderId: "SENDER_ID",
    appId: "YOUR_API_ID"
};
const fire = firebase.initializeApp(firebaseConfig)
export default fire.database().ref()
export const storage = fire.storage().ref()
export const auth = fire.auth()