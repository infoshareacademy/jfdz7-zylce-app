import userEvents from "../data/users";
import firebase from 'firebase';
import '../setupFirebase';


// Action Types
const ADD_EVENT = 'calendarView/ADD_EVENT';
const SET_EVENTS = 'userView/SET_TASKS'

// Action Creators

export const addEvent = (event) => ({
    type: ADD_EVENT,
    event
})

const setEvents = events => ({
    type: SET_EVENTS,
    events
})

let dbRef;

export const enableSync = () => dispatch => {
    const userUid = firebase.auth().currentUser.uid
    dbRef = firebase.database().ref('/users/' + userUid + '/events')
    dbRef.on('value', snapshot => {
        const value = snapshot.val()
        const events = Object.entries(value || {}).map(([id, values]) => ({
            id,
            ...values
        }))
        dispatch(setEvents(events))
    })
}

export const removeEvent = eventId => dispatch => {
    dbRef.child(eventId).remove()
    console.log(eventId)
}

export const addTask = (
    id,
    title,
    description,
    start,
    end,
    category,
    picture

) => dispatch => {
    dbRef.push({
        id: id,
        title: title,
        description: description,
        category: category,
        start: start,
        end: end,
        picture: picture
    }).update({id: this.})
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
            }
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