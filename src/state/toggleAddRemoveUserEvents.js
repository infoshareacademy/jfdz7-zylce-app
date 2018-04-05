import firebase from "firebase";

let dbRef
let callback

export const enableAddRemoveSync = () => dispatch => {
    const userUid = firebase.auth().currentUser.uid


    dbRef = firebase.database().ref('/users/' + userUid + '/events')
    callback = snapshot => {
        const value = snapshot.val()
        console.log(value)
        dispatch({ type: 'SET_USER_EVENTS', tasks: value })
    }

    dbRef.on('value', callback)
}

export const disableAddRemoveSync = () => dispatch => {
    dbRef.off('value', callback)
}



export const toggleAddRemoveEvent = (eventId, title, description, start, end, category, picture) => dispatch => {

    const childRef = dbRef.child(eventId)
    let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let timeOptions = {hour: 'numeric', minute: 'numeric'};
    let startEvent = start;
    let endEvent = end;

    childRef.once('value', snapshot => {
        if (snapshot.val()) {
            childRef.remove()
            childRef.set(null)

        } else {
            childRef.push({id: eventId})
            childRef.update({
                title: title,
                description: description,
                eventStart: `${startEvent.toLocaleDateString('pl-PL', dateOptions)} - ${startEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
                eventEnd: `${endEvent.toLocaleDateString('pl-PL', dateOptions)} - ${endEvent.toLocaleTimeString('pl-PL', timeOptions)}`,
                category: category,
                picture: picture,
            })


        }
    })
}


const initialState = {
    addedEvents: null
}

export default (state = initialState, action = {}) => {
    if (action.type === 'SET_USER_EVENTS') {
        return {
            ...state,
            addedEvents: action.addedEvents
        }
    } else {
        return state
    }
}