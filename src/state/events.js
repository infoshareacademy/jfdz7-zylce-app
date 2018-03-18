import events from "../data/events";

const initialState = {
    data: events
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state
    }
}
