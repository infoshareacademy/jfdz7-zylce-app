import moment from 'moment';

import { auth, database, facebookProvider, googleProvider } from '../setupFirebase';


const SET_USER = 'auth/SET_USER';
const TOGGLE_FORM = 'auth/TOGGLE_FORM';

export const setUser = user => ({
    type: SET_USER,
    user
});

export const toggleForm = () => ({
    type: TOGGLE_FORM
});

export const signUpWithEmail = (email, password, userData) => dispatch => {
    return auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            database
                .ref('/users/' + user.uid)
                .set(userData)
        });
};

export const signInWithFb = () => dispatch => {
    let result = auth.signInWithPopup(facebookProvider);
    return result
        .then(() => {
            database
                .ref('/users/' + auth.currentUser.uid + '/')
                .update({
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    firstName: (auth.currentUser.displayName).split(" ")[0],
                    lastName: (auth.currentUser.displayName).split(" ")[1],
                    role: 'user',
                    joinedAt: moment(auth.currentUser.createdAt).unix(),
                    online: true,
                })
        })
};

export const signInWithGoogle = () => dispatch => {
    let result = auth.signInWithPopup(googleProvider);
    return result
        .then(() => {
            database
                .ref('/users/' + auth.currentUser.uid + '/')
                .update({
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    firstName: (auth.currentUser.displayName).split(" ")[0],
                    lastName: (auth.currentUser.displayName).split(" ")[1],
                    role: 'user',
                    joinedAt: moment(auth.currentUser.createdAt).unix(),
                    online: true,
                })
        })
};

export const signInWithEmail = (email, password) => dispatch => {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
        database
            .ref('/users/' + auth.currentUser.uid + '/')
            .update({
                online: true,
            })
        })
};

export const signOut = () => dispatch => {
    database.ref('/users/' + auth.currentUser.uid)
        .update({
            lastVisit: moment(auth.currentUser.lastLoginAt).unix(),
            online: false,

            });
    auth.signOut();
};

const initialState = {
    user: null,
    showSignUpForm: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case TOGGLE_FORM:
            return {
                ...state,
                showSignUpForm: !state.showSignUpForm
            };
        default:
            return state
    }
}