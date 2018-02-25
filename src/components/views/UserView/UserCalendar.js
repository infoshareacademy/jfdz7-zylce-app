import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import events from ''
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class UserCalendar extends Component {
    state = {
        messages: {
            next:">",
            previous:"<",
            today:"dziś",
            month:"miesiąc",
            week:"tydzień",
            day:"dzień",
            allDay: 'Cały dzień',
            date: 'Data',
            time: 'Czas',
            event: 'Wydarzenie'},
        views: ['agenda'],
        events: events,
    }


    render() {

        return (
            <React.Fragment>
                <BigCalendar
                    events={events}
                    views={this.state.views}
                    defaultDate={new Date()}
                />
            </React.Fragment>
        )
    }
}

export default UserCalendar