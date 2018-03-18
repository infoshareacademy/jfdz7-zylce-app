import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'


import './App.css';
import Main from './components/Menu'
import Auth from './components/Auth'
import CalendarView from './components/views/CalendarView/CalendarView'
import UserView from './components/views/UserView/UserView'
import Footer from './components/views/Foooter/Footer'


class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Main />
        <Route exact path="/" component={Auth} />
        <Route path="/calendar" component={CalendarView} />
        <Route path="/userCalendar" component={UserView} />
      <Footer/>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
