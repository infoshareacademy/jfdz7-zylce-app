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
    let today = moment().format('L');
    console.log('dzisiaj jest: ', today)

    let eventsStartDateArray = userEvents.map( event => {
        return moment(event.start).format('L');
    });
    let eventsBeforeStartDateArray = userEvents.map( event => {
        return moment(event.start).subtract(1, 'days').calendar();
    });

    console.log('daty: ', eventsStartDateArray)
    console.log('daty przed: ', eventsBeforeStartDateArray)

    const notificationPopUp = document.querySelector('#okno')
    const notificationPopUpBtn = document.querySelector('.notification-close-btn')
    notificationPopUpBtn.addEventListener("click", ()=> notificationPopUp.classList.add('hidden')
    )


    function isDateMatch(element) {
        return (element === today);
    }
    let isDateMatchToStartDateArray = eventsStartDateArray.some(isDateMatch);
    console.log('czy daty do siebie pasuja? ', isDateMatchToStartDateArray)

    if(!isDateMatchToStartDateArray){
        console.log('nie ma impry dzisiaj')
        notificationPopUp.classList.add('hidden')

    }else{
        console.log('dzisiaj coś się dzieje w okolicy')
        notificationPopUp.classList.remove('hidden')

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