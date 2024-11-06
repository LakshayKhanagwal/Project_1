import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCGK_q7lPOt_vvEAaHXC0H1D60cRzFjJkM",
    authDomain: "storage-ac6bb.firebaseapp.com",
    projectId: "storage-ac6bb",
    storageBucket: "storage-ac6bb.appspot.com",
    messagingSenderId: "1002974074793",
    appId: "1:1002974074793:web:38752ef553f147733856b8"
};
const fire = firebase.initializeApp(firebaseConfig)
export default fire.database().ref()
export const storage = fire.storage().ref()
export const auth = fire.auth()