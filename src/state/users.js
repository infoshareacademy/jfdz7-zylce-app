import firebase from 'firebase';
import '../setupFirebase';

import moment from 'moment'
moment.locale('pl');

// Action Types
const ADD_EVENT = 'calendarView/ADD_EVENT';
const SET_EVENTS = 'userView/SET_TASKS';

// Action Creators

const setEvents = events => ({
    type: SET_EVENTS,
    events
});

let dbRef;
let callback;

export const enableUserSync = () => dispatch => {
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
//
// export const removeEvent = eventId => dispatch => {
//     dbRef.child(eventId).remove();
//     console.log(eventId)
// };


export const toggleBtnName = (eventId, userEvents) => {

    const convEventId = parseInt(eventId)

    let isMatchtoId = (element) => {
        return (convEventId === element)
    }

    let eventsIdArray = userEvents.map( event => {
        return parseInt(event.id)
    })
    console.log(convEventId)
    console.log(eventsIdArray)
    let isEventAdd = eventsIdArray.some(isMatchtoId);

    console.log(isEventAdd)

    if(isEventAdd){
        alert('Event jest już dodany!')
        document.querySelector('.event-add-remove-btn').innerHTML = 'Usuń wydarzenie'
    }else{
        alert('Event nie jest dodany')
        document.querySelector('.event-add-remove-btn').innerHTML = 'Zapisz w swoich wydarzeniach'

    }
}


export const addEventToUserEvents = (
    title,
    description,
    start,
    end,
    category,
    picture,
    eventId
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
        eventStart: `${startEvent.toLocaleDateString('pl-PL', dateOptions)} - ${startEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
        eventEnd: `${endEvent.toLocaleDateString('pl-PL', dateOptions)} - ${endEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
        picture: picture,
        eventId: eventId
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

        default:
            return state
    }
}