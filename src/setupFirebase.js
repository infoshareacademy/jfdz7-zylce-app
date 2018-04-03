import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCcFm7bKFMdfCQH9Xcu10605wxm5l1zQTk",
    authDomain: "zaplanujto-53dc4.firebaseapp.com",
    databaseURL: "https://zaplanujto-53dc4.firebaseio.com",
    projectId: "zaplanujto-53dc4",
    storageBucket: "zaplanujto-53dc4.appspot.com",
    messagingSenderId: "120684714085"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();
const provider = new firebase.auth.FacebookAuthProvider();

export {
    auth,
    database,
    provider,
};
