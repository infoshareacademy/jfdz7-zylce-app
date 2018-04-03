import firebase from 'firebase';
import '../setupFirebase';

import moment from 'moment'
moment.locale('pl');




// Action Types
const ADD_EVENT = 'calendarView/ADD_EVENT';
const SET_EVENTS = 'userView/SET_TASKS';

// Action Creators

export const addEvent = (event) => ({
    type: ADD_EVENT,
    event
});

const setEvents = events => ({
    type: SET_EVENTS,
    events
});

let dbRef;
let callback;

export const enableSync = () => dispatch => {
    const userUid = firebase.auth().currentUser.uid;

    dbRef = firebase.database().ref('/users/' + userUid + '/events');
    callback = snapshot => {
        const value = snapshot.val();
        const events = Object.entries(value || {}).map(([id, values]) => ({
            id,
            ...values
        }));

        dispatch(setEvents(events))
    };

    dbRef.on('value', callback)
};

export const disableSync = () => dispatch => {
    dbRef.off('value', callback)
};

export const removeEvent = eventId => dispatch => {
    dbRef.child(eventId).remove();
    console.log(eventId)
};

export const addTask = (
    title,
    description,
    start,
    end,
    category,
    picture



) => dispatch => {
    let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let timeOptions = {hour: 'numeric', minute: 'numeric'};

    let startEvent = start;
    let endEvent = end;

    dbRef.push({
        title: title,
        description: description,
        category: category,
        start: start,
        end: end,
        koniec: endEvent.toString(),
        eventStart: `${startEvent.toLocaleDateString('pl-PL', dateOptions)} - ${startEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
        eventEnd: `${endEvent.toLocaleDateString('pl-PL', dateOptions)} - ${endEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
        picture: picture,
    })
};


const initialState = {
    data:[],
    newEvent: {
        id: '',
        category: '',
        title: 'xxx',
        description: '',
        start: '',
        end: ''
    }
};

// Reducer
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                data: action.events
            };
        // case ADD_EVENT:
        //     console.log(state.newEvent)
        //     const addingNewEvent = state.data.concat(state.newEvent)
        //
        //     return {
        //         data: addingNewEvent,
        //         ...state,
        //     }
        default:
            return state
    }
}