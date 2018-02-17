import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './App.css';
import CalendarView from './components/views/CalendarView'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact patch="/" component={CalendarView} />
      </React.Fragment>
    );
  }
}

export default App;
