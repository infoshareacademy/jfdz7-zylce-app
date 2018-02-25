import React, { Component } from 'react';


import UserEventLists from './UserEventsList'
import UserCalendar from './UserCalendar'

class UserView extends Component {


    render() {
        return (
            <React.Fragment>
                <div className="user-view-panel">
                    <h3 className="my-events-list-title">Moje wyarzenia</h3>
                    <UserEventLists/>
                    <h3 className="my-events-list-title">Tu będzie kalendarz</h3>
                    <UserCalendar/>
                </div>

            </React.Fragment>
        )
    }
}

export default UserView