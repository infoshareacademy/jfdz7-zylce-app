import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {connect} from "react-redux";

import {setActiveEvent} from "../state/activeEvent";


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
};

class Calendar extends React.Component {
    state = {
        selectedEvent: this.props.newUserEvent
    };

    eventPreview = (event) => {
        let eventStartDate = event.start;
        let eventEndDate = event.end;
        let category = event.category;
        let picture = event.picture;
        let paragraph = document.createElement('p');
        let title = document.createElement('h3');
        let img = document.createElement('img');
        let description = event.description;
        let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let timeOptions = {hour: 'numeric', minute: 'numeric'};
        document.getElementById('event-preview').classList.remove('hidden');
        document.getElementById('event-preview-title').appendChild(title).append(`${event.title}`);
        document.getElementById('event-preview-title').classList.add(`category-${category}`);
        document.getElementById('event-preview-picture').appendChild(img).setAttribute('src', picture);
        document.getElementById('event-preview-description').innerText = description;
        document.getElementById('event-preview-date').appendChild(paragraph).innerText =
            `${eventStartDate.toLocaleDateString('pl-PL', dateOptions)}, ${eventStartDate.toLocaleTimeString('pl-PL', timeOptions)} - ${eventEndDate.toLocaleTimeString('pl-PL', timeOptions)}`;
    };

    slotSelected = () => {
        console.log('slot select')
    };

    render() {
        const min = new Date();
        min.setHours(8);
        min.setMinutes(0, 0, 0);
        const max = new Date();
        max.setHours(23);
        max.setMinutes(57, 0, 0);
        const { activeFilterNames } = this.props;
        return (
            <React.Fragment>
                <div id="calendar" className="calendar">
                    <BigCalendar
                        messages={config.messages}
                        eventPropGetter={event => ({className: `category-${event.category} event-${event.id}`})}
                        events={(this.props.events.filter)(event => activeFilterNames.length === 0
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
                        onSelectEvent={event => {
                            this.props.setActiveEvent(event);
                            this.eventPreview(event);
                            }
                        }
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        activeFilterNames: state.filtering.activeFilterNames,
        activeEvent: state.activeEvent.activeEvent
    }), { setActiveEvent }
    //     events: state.events.data,
    //     activeFilterNames: state.filtering.activeFilterNames,
    //     newUserEvent: state.users.newEvent
    // }), {}
)(Calendar)