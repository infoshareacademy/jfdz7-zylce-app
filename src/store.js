import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './setupFirebase';

import events, {getEvents} from './state/events';
import filtering from "./state/filtering";
import activeEvent from "./state/activeEvent";

const reducer = combineReducers({
    events,
    filtering,
    activeEvent
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(getEvents());

export default store;
