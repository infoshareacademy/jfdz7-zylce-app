import userEvents from "../data/users";

// Action Types
const REMOVE_EVENT = 'userView/REMOVE_EVENT';
const ADD_EVENT = 'calendarView/ADD_EVENT'

// Action Creators
export const removeEvent = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
})

export const addEvent = (event) => ({
    type: ADD_EVENT,
    event
})

const initialState = {
    data: userEvents[0].userEvents,
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