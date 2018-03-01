import React, { Component } from 'react'

import UserAgenda from './UserAgenda';
import UserCalendar from './UserCalendar';

class UserView extends Component {
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