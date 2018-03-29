import userEvents from "../data/users";
import firebase from 'firebase';
import '../setupFirebase';


// Action Types
const REMOVE_EVENT = 'userView/REMOVE_EVENT';
const ADD_EVENT = 'calendarView/ADD_EVENT';
const SET_TASKS = 'userView/SET_TASKS'

// Action Creators

// export const removeEvent = (eventId) => ({
//     type: REMOVE_EVENT,
//     eventId
// }

export const removeEvent = eventId => dispatch => {
    const userUid = firebase.auth().currentUser.uid
    dbRef = firebase.database().ref('/users/' + userUid + '/events')
    console.log(dbRef)
    // dbRef.child(taskId).remove()
}

export const addEvent = (event) => ({
    type: ADD_EVENT,
    event
})

const setTasks = tasks => ({
    type: SET_TASKS,
    tasks
})

let dbRef;

export const enableSync = () => dispatch => {
    const userUid = firebase.auth().currentUser.uid
     dbRef = firebase.database().ref('/users/' + userUid + '/events')

    dbRef.on('value', snapshot => {
        const value = snapshot.val()
        const tasks = Object.entries(value || {}).map(([id, values]) => ({
            id,
            ...values
        }))

        dispatch(setTasks(tasks))
    })
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
        case SET_TASKS:
            return {
                ...state,
                data: action.tasks
            }
        case ADD_EVENT:
            console.log(state.newEvent)
            const addingNewEvent = state.data.concat(state.newEvent)

            return {
                data: addingNewEvent,
                ...state,
            }
        case REMOVE_EVENT:
            console.log('usuwam event usera!')
            const updatedUserEventArray = state.data.filter( event => event.id !== action.eventId)
            return {
                ...state,
                data: updatedUserEventArray
            }
        default:
            return state
    }
}