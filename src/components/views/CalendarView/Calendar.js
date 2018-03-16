import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventPreview from "./EventPreview";
import users from '../../../data/users';

import {connect} from 'react-redux'



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
        views: ['month', 'week', 'day'],
        // currentEvent: [],
        currentEvent: this.props.userCurrentEvent
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
        let currentEvent = {id: Date.now().toString(32), title: event.title, start: event.start, end: event.end, category: event.category};
        this.setState({currentEvent: [currentEvent]});
    };

    saveEventToUserEvents = () => {
        // concat userEvents with currentEvent from state
        let arr = this.props.userEvents.concat(this.state.currentEvent);
        console.log(arr);
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
                        <div id="calendar" className="calendar">
                        <BigCalendar
                            messages={this.state.messages}
                            eventPropGetter={event => ({className: `category-${event.category} event-${event.id}`})}
                            events={this.props.allEvents}
                            views={this.state.views}
                            view={this.state.view}
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
                        <EventPreview eventPreview={this.eventPreview}     saveEventToUserEvents={this.saveEventToUserEvents} />
                    </div>
                    </React.Fragment>
                )
            }
}

const mapStateToProps = state => {
    return{
        allEvents: state.allEvents,
        userEvents: state.userEvents,
        userCurrentEvent: state.currentEvent
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)