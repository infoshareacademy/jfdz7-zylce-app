import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import events from './dataForTest/events'

moment.locale('pl');
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends React.Component {
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
        events: events,
        views: ['month', 'week', 'day'],
    };


    render() {

        return (
            <React.Fragment>
                <h1>kalendarz</h1>
                <div className="calendar">
                <BigCalendar
                    messages={this.state.messages}
                    eventPropGetter={event => ({className: `category-${event.category}`})}
                    events={this.state.events}
                    views={this.state.views}
                    view={this.state.view}
                    selectable = {true}
                    showMultiDayTimes
                    popup
                    timeslots={4}
                />
                </div>
            </React.Fragment>
        )
    }
}

export default Calendar;