import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase from "firebase";
import './setupFirebase';

import events, {getEvents} from './state/events';
import filtering from "./state/filtering";
import activeEvent from "./state/activeEvent";
import auth, {setUser} from "./state/auth";
import userData, {enableSync, disableSync} from "./state/userData";

import eventPreview from "./state/activeEvent";
import users, {enableUserSync} from './state/users';
import {enableFavSync} from './state/favorites';


const reducer = combineReducers({
    events,
    filtering,
    activeEvent,
    auth,
    userData,
    eventPreview,
    users,
    enableUserSync,
    enableFavSync

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(getEvents());

firebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
        store.dispatch(enableSync())
        store.dispatch(enableUserSync())
        store.dispatch(enableFavSync())
    } else {
        store.dispatch(disableSync())
    }
    store.dispatch(setUser(user))
});

export default store;
