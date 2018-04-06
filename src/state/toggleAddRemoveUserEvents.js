import firebase from "firebase";

let dbRef;
let callback;

export const enableAddRemoveSync = () => dispatch => {
    const userUid = firebase.auth().currentUser.uid;

    dbRef = firebase.database().ref('/users/' + userUid + '/events');
    callback = snapshot => {
        const value = snapshot.val();
        dispatch({ type: 'SET_USER_EVENTS', tasks: value })
    };

    dbRef.on('value', callback)
};

export const disableAddRemoveSync = () => dispatch => {
    dbRef.off('value', callback)
};

export const toggleAddRemoveEvent = (eventId, title, description, start, end, category, picture) => dispatch => {

    const childRef = dbRef.child(eventId);
    let startEvent = start;
    let endEvent = end;

    childRef.once('value', snapshot => {
        if (snapshot.val()) {
            childRef.remove();
            childRef.set(null);

        } else {
            childRef.push({id: eventId});
            childRef.update({
                title: title,
                description: description,
                start: startEvent,
                end: endEvent,
                category: category,
                picture: picture,
            })


        }
    })
};

const initialState = {
    addedEvents: null
};

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