import React, { Component } from 'react'

import UserAgenda from './UserAgenda';
import UserCalendar from './UserCalendar';
import UserInfo from './UserInfo'

import userEvents from '../../../data/users';

class UserView extends Component {
    state = {
        events: userEvents[0].userEvents
    }

    render() {
        return (
            <React.Fragment>
                <UserInfo/>
                <UserAgenda userAgenda={this.state.events}/>
                <UserCalendar userCalendar={this.state.events}/>
            </React.Fragment>
        )
    }
}

export default UserView