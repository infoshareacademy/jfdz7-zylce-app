import React, { Component } from 'react';
import UserCalendar from '../UserView/UserCalendar';
import UserAgenda from '../UserView/UserAgenda';
import firebase from 'firebase'
class UserView extends Component {
   state= {
       userEvents: ''
   };


    render() {
        return (
            <React.Fragment>
                <UserAgenda/>
                <UserCalendar/>
            </React.Fragment>
        )
    }
}

export default UserView