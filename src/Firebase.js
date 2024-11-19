import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC1dDh0p3Y0W7rQz87yjAEAVhZ_T9N8E9M",
    authDomain: "project-1-advancce.firebaseapp.com",
    projectId: "project-1-advancce",
    storageBucket: "project-1-advancce.firebasestorage.app",
    messagingSenderId: "203047518652",
    appId: "1:203047518652:web:734110337403de481cebb9"
};
const fire = firebase.initializeApp(firebaseConfig)
export default fire.database().ref()
export const storage = fire.storage().ref()
export const auth = fire.auth()