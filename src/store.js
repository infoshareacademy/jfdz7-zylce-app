import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './setupFirebase';
import firebase from 'firebase'

import events, {getEvents} from './state/events';
import filtering from "./state/filtering";
import eventPreview from "./state/eventPreview";
import users, {enableSync} from './state/users';
import auth, {setUser} from './state/auth';


const reducer = combineReducers({
    events,
    filtering,
    eventPreview,
    filtering,
    users,
    auth
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// firebase.auth().onAuthStateChanged(user => store.dispatch(setUser(user)));

firebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
        store.dispatch(enableSync())
    }
    store.dispatch(setUser(user))
})


store.dispatch(getEvents());

export default store;
