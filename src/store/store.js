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
        case 'DELETE_EVENT' :

            return {
                ...state,
            }
        default:
            return state
    }

}


const store = createStore(reducer)

export default store