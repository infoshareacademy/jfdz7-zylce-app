import {createStore} from 'redux'
import users from '../data/userEvents'

const initialState = {
    userEvents: users
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_EVENT' :
            return {
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