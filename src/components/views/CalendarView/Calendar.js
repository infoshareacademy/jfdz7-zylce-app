import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/nb';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from './dataForTest/events'

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
        culture: 'en',
        events: events,
        views: ['month', 'week', 'day']
    }


    render() {
        return (
            <React.Fragment>
                <h1>kalendarz</h1>
                <div class="calendar">
                <BigCalendar
                    messages={this.state.messages}
                    culture={this.state.culture}
                    events={this.state.events}
                    views={this.state.views}
                    view={this.state.view}
                    formats={{timeGutterFormat: 'h A', dayFormat:'ddd D'}}
                    step={15}
                />
                </div>
            </React.Fragment>
        )
    }
}

export default Calendar;