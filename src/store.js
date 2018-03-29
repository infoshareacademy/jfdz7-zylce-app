import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './setupFirebase';

import events, {getEvents} from './state/events';
import filtering from "./state/filtering";
import eventPreview from "./state/eventPreview";
import users from './state/users';

const reducer = combineReducers({
    events,
    filtering,
    eventPreview
    filtering,
    users
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(getEvents());

export default store;
