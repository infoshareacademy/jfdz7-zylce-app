import {createStore} from 'redux'
import users from '../data/users'

const initialState = {
    userEvents: users[0]
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