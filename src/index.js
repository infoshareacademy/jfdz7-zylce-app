import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Auth from './components/Auth';
import App from './App';
import store from "./store";


ReactDOM.render(
    <Provider store={store}>
        <Auth >
            <Router>
                <App />
            </Router>
        </Auth>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
