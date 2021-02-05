import firebase from 'firebase/app';
import 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyCiybTTelugvkWq9sDDeBYSpNlKzXuBrls",
    authDomain: "fdtigermaster-dev.firebaseapp.com",
    databaseURL: "https://fdtigermaster-dev.firebaseio.com",
    projectId: "fdtigermaster-dev",
    storageBucket: "fdtigermaster-dev.appspot.com",
    messagingSenderId: "16706967805",
    appId: "1:16706967805:web:6465537a3bf6787e4f0694",
    measurementId: "G-DS8Z1YM362"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const messaging = firebase.messaging();