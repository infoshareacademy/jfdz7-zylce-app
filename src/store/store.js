import {createStore} from 'redux'
import users from '../data/users'
import events from '../data/events'

const initialState = {
    allEvents: events,
    userEvents: users[0].userEvents,
    userInfo: users[0],
    currentEvent: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_EVENT' :
            console.log('dodaję event!')
            console.log(state.currentEvent)
            const updatedEvents = state.userEvents.concat(state.currentEvent)
            return {
                userEvents: updatedEvents,
                ...state,

            }
        case 'DELETE_USER_EVENT' :
            console.log('usuwam event usera!')
            const updatedUserEventArray = state.userEvents.filter( event => event.id !== action.eventId)
            return {
                ...state,
                userEvents: updatedUserEventArray
            }
        case 'CLOSE_USER_EVENT_WINDOW' :
            console.log('chcę zamknąć event!')
            let userEventWindow = document.querySelector('.user-event-window');
            userEventWindow.classList.add('hidden');
            return {
                ...state,
            }
        case 'OPEN_USER_EVENT_WINDOW' :
            console.log('chcę otworzyć okno z evenetem!');
            userEventWindow = document.querySelector('.user-event-window');
            userEventWindow.classList.remove('hidden');
            return {
                ...state
            }
        default:
            return state
    }

}


const store = createStore(reducer)

export default store