import React, { Component } from 'react';

import UserEventLists from './UserEventsList';


class UserView extends Component {


    render() {
        return (
            <React.Fragment>
                <div className="user-view-panel">
                    <h3 className="my-events-list-title">Moje wyarzenia</h3>
                    <UserEventLists/>
                    <h3 className="my-events-list-title">Tu będzie kalendarz</h3>
                </div>

            </React.Fragment>
        )
    }
}

export default UserView