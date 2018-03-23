import React from 'react'
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import EventPreview from './EventPreview'

moment.locale('pl');
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

let formats = {
    dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'dd, DoMM', culture),

    dayRangeHeaderFormat: ({start, end}, culture, localizer) =>
        localizer.format(start, 'DoMM', culture) + ' - ' + localizer.format(end, 'DoMM', culture),

    dayHeaderFormat: (date, culture, localizer) =>
        localizer.format(date, 'dddd, DD MMMM', culture),
};

const config = {
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
    views: ['month', 'week', 'day'],
}

class Calendar extends React.Component {
    state = {
        selectedEvent: this.props.newUserEvent
    };

    slotSelected = () => {
        console.log('slot select')
    };

    eventPreview = (event) => {
        let eventStartDate = event.start;
        let eventEndDate = event.end;
        let category = event.category;
        let paragraph = document.createElement('p');
        let title = document.createElement('h3');
        let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let timeOptions = {hour: 'numeric', minute: 'numeric'};
        document.getElementById('event-preview').classList.remove('hidden');
        document.getElementById('event-preview-title').appendChild(title).append(`${event.title}`);
        document.getElementById('event-preview-title').classList.add(`category-${category}`);
        document.getElementById('event-preview-date').appendChild(paragraph).innerText =
            `${eventStartDate.toLocaleDateString('pl-PL', dateOptions)}, ${eventStartDate.toLocaleTimeString('pl-PL', timeOptions)} - ${eventEndDate.toLocaleTimeString('pl-PL', timeOptions)}`;

        //add user event to state
        console.log(this.state.selectedEvent)
        const userEvent = {

                id: Date.now().toString(32),
                title: event.title,
                category: event.category,
                start: event.start,
                end: event.end
            }

        this.setState({
            selectedEvent: this.state.selectedEvent = userEvent
        })
        console.log(this.state.selectedEvent)

    };

    render() {
        const min = new Date();
        min.setHours(8);
        min.setMinutes(0, 0, 0);
        const max = new Date();
        max.setHours(23);
        max.setMinutes(57, 0, 0);
        const { events, activeFilterNames } = this.props;
        return (
            <React.Fragment>
                <div id="calendar" className="calendar">
                    <BigCalendar
                        messages={config.messages}
                        eventPropGetter={event => ({className: `category-${event.category} event-${event.id}`})}
                        events={events.filter(event => activeFilterNames.length === 0
                            ? true
                            : activeFilterNames.includes(event.category)
                        )}
                        views={config.views}
                        view={config.view}
                        selectable = {true}
                        popup
                        timeslots={4}
                        step={15}
                        defaultDate={new Date()}
                        formats={formats}
                        showMultiDayTimes = {true}
                        min={min}
                        max={max}
                        onSelectSlot={this.slotSelected}
                        onSelectEvent={this.eventPreview}
                    />
                </div>
                <div>
                    <EventPreview eventPreview={this.eventPreview} />
                </div>
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        events: state.events.data,
        activeFilterNames: state.filtering.activeFilterNames,
        newUserEvent: state.users.newEvent
    }), {}
)(Calendar)