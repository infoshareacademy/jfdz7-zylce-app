import { auth, database } from '../setupFirebase';
import firebase from 'firebase';

const SET_USER = 'auth/SET_USER';

export const setUser = user => ({
    type: SET_USER,
    user
});

let dbRef;
let callback;

export const getUserData = user => dispatch => {
    dbRef = database.ref('users/' + user.uid + '/');
        callback = snapshot => {
            const value = snapshot.val();
            dispatch({ type: 'SET_USER_DATA', data: value });
        };
        dbRef.on('value', callback);

};

// Sign Up
export const signUpWithEmail = (email, password, userData) => dispatch => {
    return auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            firebase
                .database()
                .ref('/users/' + user.uid)
                .set(userData)
        });
};


export const signInWithFb = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    let userEmail = provider.addScope('email');

    provider.setCustomParameters({
        'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

}

// Sign In
export const signInWithEmail = (email, password) => dispatch => {
    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            firebase
                .database()
                .ref('/users/' + user.uid)
                .update({lastVisit: Date.now()})
        });
};



// Sign out
export const signOut = () =>
    auth.signOut();

const initialState = {
    user: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        default:
            return state
    }
}