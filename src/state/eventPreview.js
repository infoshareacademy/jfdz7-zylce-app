const SET_ACTIVE_EVENT = 'eventPreview/SET_ACTIVE_EVENT';

export const setActiveEvent = activeEvent => ({
    type: SET_ACTIVE_EVENT,
    activeEvent
});

const initialState = {
    activeEvent: ''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_ACTIVE_EVENT:
            return {
                ...initialState,
                activeEvent: action.activeEvent
            };
        default:
            return state
    }
}
