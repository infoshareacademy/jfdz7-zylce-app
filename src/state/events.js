import {database} from '../setupFirebase';

let dbRef;
let callback;

export const getEvents = () => dispatch => {
    dbRef = database.ref('events/');
    callback = snapshot => {
        const value = snapshot.val();
        dispatch({ type: 'SET_EVENTS', data: value });
    };
    dbRef.on('value', callback);
};

const initialState = {
    data: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return {
                ...state,
                data: action.data
            };
        default:
        {
            return state
        }
    }
}
