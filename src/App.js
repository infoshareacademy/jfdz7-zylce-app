import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './App.css';
import Header from './components/views/Header'
import CalendarView from './components/views/CalendarView'
import UserView from './components/views/UserView'
import AdminView from './components/views/AdminView'
import Footer from './components/views/Foooter'


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={Header} />
        <Route exact path="/" component={CalendarView} />
        <Route path="/" component={UserView} />
        <Route path="/" component={AdminView} />
        <Route path="/" component={Footer} />
      </React.Fragment>
    );
  }
}

export default App;
