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
    let tommorow = moment(new Date()).add(1,'days');
    let tommorowFormated = moment(tommorow).format('L')
    console.log('dzisiaj jest: ', today)
    console.log('jutro jest: ', tommorowFormated)

    let eventsStartDateArray = userEvents.map( event => {
        return moment(event.start).format('L');
    });
    let eventsAfterStartDateArray = userEvents.map( event => {
        return moment(event.start).add(1, 'days').format("DD.MM.YYYY");
    })


    console.log('daty: ', eventsStartDateArray)
    console.log('daty jutro : ', eventsAfterStartDateArray)

    const notificationPopUp = document.querySelector('#notification-popup')
    const notificationPopUpBtn = document.querySelector('.notification-close-btn')
    notificationPopUpBtn.addEventListener("click", ()=> notificationPopUp.classList.add('hidden')
    )


    function isDateMatch(element) {
        return (element === today);
    }
    let isDateMatchToStartDateArray = eventsStartDateArray.some(isDateMatch);
    console.log('czy daty do siebie pasuja? ', isDateMatchToStartDateArray);

    if(!isDateMatchToStartDateArray){
        console.log('nie ma impry dzisiaj')
        notificationPopUp.classList.add('hidden')

    }else{
        console.log('dzisiaj coś się dzieje w okolicy')
        notificationPopUp.classList.remove('hidden')
        document.querySelector('.notification-info').innerHTML = 'Dzisiaj są jakieś wydarzenia w twoim kalendarzu'
    }

    function isTommorowDateMatch(element) {
        return (element === tommorowFormated);
    }

    let isTommorowDateMatchToAfterStartDateArray = eventsStartDateArray.some(isTommorowDateMatch);
    console.log('czy jutrzejsze daty do siebie pasuja? ', isTommorowDateMatchToAfterStartDateArray);

    if(!isTommorowDateMatchToAfterStartDateArray){
        console.log('nie ma impry jutro')
        document.querySelector('.notification-tommorow-info').innerHTML = ''


    }else{
        console.log('jutro coś się dzieje w okolicy')
        notificationPopUp.classList.remove('hidden')
        document.querySelector('.notification-tommorow-info').innerHTML = 'Jutro są jakieś wydarzenia w twoim kalendarzu'

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