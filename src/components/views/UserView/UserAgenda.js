import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import userEvents from '../../../data/userEvents';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class UserAgenda extends Component {
    render() {
        return (
            <React.Fragment>
                <h3>Moje wydarzenia</h3>
                <BigCalendar
                    events={userEvents}
                    step={15}
                    timeslots={4}
                    defaultView="agenda"
                    selectable = {true}
                    defaultDate={new Date()}
                    toolbar = {false}
                />
            </React.Fragment>
        )
    }
}

export default UserAgenda