import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import events from './dataForTest/events'

moment.locale('pl');
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

let formats = {
    dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'dd, DoMM', culture),

    dayRangeHeaderFormat: ({start, end}, culture, localizer) =>
        localizer.format(start, 'DoMM', culture) + ' - ' + localizer.format(end, 'DoMM', culture),

    dayHeaderFormat: (date, culture, localizer) =>
        localizer.format(date, 'dddd, DD MMMM', culture)
};

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
        const min = new Date();
        min.setHours(8);
        min.setMinutes(0, 0, 0);
        const max = new Date();
        max.setHours(23);
        max.setMinutes(57, 0, 0);
        return (
            <React.Fragment>
                <h1>kalendarz</h1>
                <div className="calendar">
                <BigCalendar
                    messages={this.state.messages}
                    eventPropGetter={event => ({className: `category-${event.category} event-${event.id}`})}
                    events={this.state.events}
                    views={this.state.views}
                    view={this.state.view}
                    selectable = {true}
                    popup

                    defaultDate={new Date()}
                    formats={formats}
                    min={min}
                    max={max}
                />
                </div>
            </React.Fragment>
        )
    }
}

export default Calendar;