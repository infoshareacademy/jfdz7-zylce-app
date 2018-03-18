import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'


import './App.css';
import Main from './components/Menu'
import HomeView from './components/HomeView'
import CalendarView from './components/views/CalendarView'
import UserView from './components/views/UserView/UserView'
import Footer from './components/views/Foooter/Footer'


class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Main />
          <div className='container'>
              <div className="content">
                  <Route exact path="/" component={HomeView} />
                  <Route path="/calendar" component={CalendarView} />
                  <Route path="/userCalendar" component={UserView} />
              </div>
              <Footer/>
          </div>

      </React.Fragment>
    );
  }
}

export default withRouter(App);
