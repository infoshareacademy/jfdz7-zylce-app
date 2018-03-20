import userEvents from "../data/users";

const initialState = {
    data: userEvents
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state
    }
}