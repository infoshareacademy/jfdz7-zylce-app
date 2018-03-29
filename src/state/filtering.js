const ACTIVATE_FILTER = 'filtering/ACTIVATE_FILTER';
const DEACTIVATE_FILTER = 'filtering/DEACTIVATE_FILTER';

export const toggleFilter = filterName => ({
    type: ACTIVATE_FILTER,
    filterName
});

export const deactivateFilter = () => ({
    type: DEACTIVATE_FILTER
});

const initialState = {
    activeFilterNames: [],
    categoryNames: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ACTIVATE_FILTER:
            return {
                ...initialState,
                activeFilterNames: state.activeFilterNames.includes(action.filterName)
                    ? state.activeFilterNames.filter(category => category !== action.filterName)
                    : state.activeFilterNames.concat(action.filterName)
            };
        case DEACTIVATE_FILTER:
            return initialState;
        default:
            return state
    }
}
