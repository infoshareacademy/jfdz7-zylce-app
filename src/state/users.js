import firebase from 'firebase';
import '../setupFirebase';

import moment from 'moment'
moment.locale('pl');

// Action Types
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

export const toggleBtnName = (eventId, userEvents) => {

    const convertedEventId = parseInt(eventId)

    let isMatchtoId = (element) => {
        return (convertedEventId === element)
    };

    let eventsIdArray = userEvents.map( event => {
        return parseInt(event.id);
    });
    let isEventAdd = eventsIdArray.some(isMatchtoId);

    if(isEventAdd){
        document.querySelector('.event-add-remove-btn').innerHTML = 'Usuń wydarzenie';
    }else{
        document.querySelector('.event-add-remove-btn').innerHTML = 'Zapisz w swoich wydarzeniach';
    }
};

//TODO: Tutaj jest funkcja opowiadająca za info o dzisiejszym wydarzeniu
export const eventNotification = (userEvents) => {
    let eventsStartDateArray = userEvents.map( event => {
        return event.start;
    });

    console.log('daty: ', eventsStartDateArray)

    let isMatchtoDate = (element) => {
        return (eventsStartDateArray[1] === eventsStartDateArray[1])
    };
    console.log(isMatchtoDate())

    if(isMatchtoDate){
        console.log('dzisiaj jest jakas impra')
    }
}

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