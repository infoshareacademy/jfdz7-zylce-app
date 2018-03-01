import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pl'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import EventPreview from "./EventPreview";
import userEvents from '../../../data/userEvents'

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

let newUserEvent ; // nowa zmienna potrzebna do zrobienia nowego eventu pushowanego do UserEvents

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

    };

    slotSelected = () => {
        console.log('slot select')
    };

    // Kod Łukasza

    createNewUserEvent = (event) => {
        const newId = Date.now().toString(32);

        const myEvent = {
            id: newId,
            name: event.title,
            start: event.start,
            end: event.end
        };
        newUserEvent = myEvent;

        console.log(myEvent); //tylko testowo
        console.log(userEvents); //tylko testowo
        console.log(newUserEvent, 'nowy event') //tylko testowo
    };
    addNewUserEventToUserEvents = ()=>{
        userEvents.push(newUserEvent);
        console.log(userEvents); // tylko testowo
    }


    eventPreview = (event) => {
        this.createNewUserEvent(event);
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
                            events={this.props.events}
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
                        <EventPreview addEvent={this.addNewUserEventToUserEvents} eventPreview={this.eventPreview} />
                    </div>
                    </React.Fragment>
                )
            }
}

export default Calendar