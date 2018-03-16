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
        default:
            return state
    }

}


const store = createStore(reducer)

export default store