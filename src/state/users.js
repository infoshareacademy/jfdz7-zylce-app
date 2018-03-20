import userEvents from "../data/users";

// Action Types
const REMOVE_EVENT = 'userView/REMOVE_TASK';

// Action Creators
export const removeEvent = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
})

const initialState = {
    data: userEvents[0].userEvents
};

// Reducer
export default (state = initialState, action = {}) => {
    switch (action.type) {
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