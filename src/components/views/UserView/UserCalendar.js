import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';

import userEvents from '../../../data/userEvents';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class UserCalendar extends Component {
    render() {
        return (
            <React.Fragment>
                <h3>Mój kalendarz</h3>
                <BigCalendar
                    events={userEvents}
                    step={15}
                    timeslots={4}
                    defaultView= 'month'
                    selectable = {true}
                    defaultDate={new Date()}
                    toolbar = {false}
                />
            </React.Fragment>
        )
    }
}

export default UserCalendar