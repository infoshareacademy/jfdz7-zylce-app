import firebase from 'firebase';
import '../setupFirebase';

const SET_USER_DATA = 'SET_USER_DATA';

const setUserData = user => ({
    type: SET_USER_DATA,
    user
});

let dbRef;

export const enableSync = () => dispatch => {
    const userUid = firebase.auth().currentUser.uid;
    dbRef = firebase.database().ref('/users/' + userUid);

    dbRef.on('value', snapshot => {
        const values = {...snapshot.val(), id: userUid };
        dispatch(setUserData(values));
    });
};


const initialState = {
    user: {
        firstName: '',
        lastName: '',
        joinedAt: '',
        lastVisit: ''
    }
};

// Reducer
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}