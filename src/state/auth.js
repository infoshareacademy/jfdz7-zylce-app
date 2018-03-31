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


// Sign In
export const signInWithEmail = (email, password) => dispatch => {
    auth.signInWithEmailAndPassword(email, password);
};



// Sign out
export const signOut = () =>
    auth.signOut();

const initialState = {
    user: null
}

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