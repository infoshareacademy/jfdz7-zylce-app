import { database } from '../setupFirebase';

let dbRef;
let callback;

export const getUsersData = () => dispatch => {
        dbRef = database.ref('users');
        callback = snapshot => {
            const value = snapshot.val();
            dispatch({type: 'SET_USERS_DATA', data: value});
        };
        dbRef.on('value', callback)
};

const initialState = {
    usersData: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_USERS_DATA':
            return {
                ...state,
                usersData: action.data
            };
        default:
        {
            return state
        }
    }
}
