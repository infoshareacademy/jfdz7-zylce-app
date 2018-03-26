import events from "../data/events";
import firebase from 'firebase';
import '../setupFirebase';

const SET_EVENTS = 'events/SET_EVENTS';

let dbRef;
let callback;

export const getEvents = () => dispatch => {
    dbRef = firebase.database().ref('events');
    callback = snapshot => {
        const value = snapshot.val();
        dispatch({ type: SET_EVENTS, data: value })
    };
    dbRef.on('value', callback);
};



const initialState = {
    data: events
};

export default (state = initialState, action = {}) => {
    if (action.type === 'SET_EVENTS') {
        return {
            ...state,
            events: action.events
        };
    } else {
        return state
    }
}
