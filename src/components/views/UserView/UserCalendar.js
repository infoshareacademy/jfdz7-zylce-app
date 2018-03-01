import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';

import myEventsList from '../../../data/userEvents';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class UserCalendar extends Component {
    render() {
        return (
            <React.Fragment>
                <h3>Mój kalenarz</h3>
                <BigCalendar
                    {...this.props}
                    events={myEventsList}
                    step={15}
                    timeslots={4}
                    defaultView="month"
                    selectable = {true}
                    defaultDate={new Date()}
                />
            </React.Fragment>
        )
    }
}

export default UserCalendar