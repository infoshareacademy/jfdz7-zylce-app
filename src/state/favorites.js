import firebase from "firebase";

let dbRef
let callback

export const enableAddRemoveSync = () => dispatch => {
    const userUid = firebase.auth().currentUser.uid

    dbRef = firebase.database().ref('/users/' + userUid + '/events')
    callback = snapshot => {
        const value = snapshot.val()
        console.log(value)
        dispatch({ type: 'SET_FAVORITE_TASKS', tasks: value })
    }

    dbRef.on('value', callback)
}

export const disableAddRemoveSync = () => dispatch => {
    dbRef.off('value', callback)
}

export const toggleAddRemoveEvent = (eventId, title, description, start, end, category, picture) => dispatch => {
    const childRef = dbRef.child(eventId)
    const mainRef = firebase.database().ref('/events/' + eventId + '/toggle/')

    console.log('main: ', mainRef)

    let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let timeOptions = {hour: 'numeric', minute: 'numeric'};

    let startEvent = start;
    let endEvent = end;

    childRef.once('value', snapshot => {
        if (snapshot.val()) {
            // childRef.set(null)
            // childRef.remove()
            childRef.set(null)
            mainRef.set(null)
            dbRef.remove()
            console.log('usuwam z bazy')

        } else {

            dbRef.push({
                title: title,
                description: description,
                eventStart: `${startEvent.toLocaleDateString('pl-PL', dateOptions)} - ${startEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
                eventEnd: `${endEvent.toLocaleDateString('pl-PL', dateOptions)} - ${endEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
                category: category,
                picture: picture,
            })
            mainRef.set(true)
            console.log('dodaje do bazy')
        }
    })
}

const initialState = {
    tasks: null
}

export default (state = initialState, action = {}) => {
    if (action.type === 'SET_FAVORITE_TASKS') {
        return {
            ...state,
            tasks: action.tasks
        }
    } else {
        return state
    }
}