import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import './App.css';

import Main from './components/Menu';
import CalendarView from './components/views/CalendarView';
import UserView from './components/views/UserView/UserView';
import SignIn from "./components/SignInForm";
import SignUp from "./components/SignUpForm";
import AdminPanel from "./components/AdminPanel";


class App extends Component {

  render() {
    return (
      <React.Fragment>
              <Main />
              <div className='container'>
                  <div className="content">
                      <Route exact path="/" component={CalendarView} />
                      <Route path="/userCalendar" component={UserView} />
                      <Route path="/signIn" component={SignIn} />
                      <Route path="/signUp" component={SignUp} />
                      <Route path="/adminPanel" component={AdminPanel} />
                      <Redirect from='*' to='/' />
                  </div>
              </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
