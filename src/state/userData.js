import { database, auth } from '../setupFirebase';

const SET_USER_DATA = 'SET_USER_DATA';

const setUserData = user => ({
    type: SET_USER_DATA,
    user
});

let dbRef;
let callback;

export const enableSync = () => dispatch => {
    const userUid = auth.currentUser.uid;
    dbRef = database.ref('/users/' + userUid);
    callback = snapshot => {
        const value = snapshot.val();
        const user = {...value, id: userUid };
        dispatch(setUserData(user))
    };
    dbRef.on('value', callback)
};

export const disableSync = () => dispatch => {
    dbRef.off('value', callback)
};

const initialState = {
    user: {
        firstName: '',
        lastName: '',
        joinedAt: '',
        lastVisit: ''
    }
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}