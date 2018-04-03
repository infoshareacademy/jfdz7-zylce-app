import { auth, database, provider } from '../setupFirebase';
import firebase from 'firebase';
import moment from 'moment';

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

export const signInWithFb = () => dispatch => {
    let result = auth.signInWithPopup(provider);
    return result
        .then(() => {
            firebase
                .database()
                .ref('/users/' + auth.currentUser.uid + '/')
                .update({
                        displayName: auth.currentUser.displayName,
                        role: 'user',
                        joinedAt: moment(auth.currentUser.createdAt).unix(),
                        lastVisit: moment().unix()
                })

        })


};

// Sign In
export const signInWithEmail = (email, password) => dispatch => {
    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            firebase
                .database()
                .ref('/users/' + user.uid)
                .update({lastVisit: moment().unix()})
        });
};



// Sign out
export const signOut = () => dispatch =>
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