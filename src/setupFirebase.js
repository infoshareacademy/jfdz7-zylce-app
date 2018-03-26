import firebase from 'firebase';

export const getSectionsDB = () => {
    return database.ref('/').once('value')
}

const config = {
    apiKey: "AIzaSyCcFm7bKFMdfCQH9Xcu10605wxm5l1zQTk",
    authDomain: "zaplanujto-53dc4.firebaseapp.com",
    databaseURL: "https://zaplanujto-53dc4.firebaseio.com",
    projectId: "zaplanujto-53dc4",
    storageBucket: "zaplanujto-53dc4.appspot.com",
    messagingSenderId: "120684714085"
};
firebase.initializeApp(config);

const database = firebase.database();

export default database;