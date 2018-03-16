import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';
import {connect} from 'react-redux'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class UserCalendar extends Component {
    state ={
        // userEvents: this.props.userCalendar,
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
        currentEvent: []
    }



    onCloseEvent = () => {
        console.log('chcę zamknąć event!')
        let userEventWindow = document.querySelector('.user-event-window');

        userEventWindow.classList.add('hidden');
    }

    onRemoveEvent = (eventId) => {

        console.log('kliknąłem na button w evencie')
        this.setState({
            userEvents: this.state.userEvents.filter( userEvent => userEvent.id !== eventId)
        })
        console.log(this.state.userEvents);

    }

    onSelectEvent = (event) => {

        console.log('Kliknąłem na event')
        let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let timeOptions = {hour: 'numeric', minute: 'numeric'};
        let eventCategory = event.category;
        let eventStartDate = event.start;
        let eventEndDate = event.end;
        let eventTitle = event.title;
        let userEventWindow = document.querySelector('.user-event-window');
        let userEvenTitle = document.querySelector('.user-event-title');
        let userEventStart = document.querySelector('.user-event-start');
        let userEventEnd = document.querySelector('.user-event-end');
        let userEventDelBtn = document.querySelector('.user-event-delete-btn');
        let userEventCloseBtn = document.querySelector('.user-event-close-btn');

        userEventWindow.classList.remove('hidden');
        userEvenTitle.innerHTML = eventTitle;
        userEvenTitle.classList.add(`category-${eventCategory}`)
        userEventStart.innerHTML = `start: ${eventStartDate.toLocaleDateString('pl-PL', dateOptions)}, ${eventStartDate.toLocaleTimeString('pl-PL', timeOptions)}`
        userEventEnd.innerHTML = `start: ${eventEndDate.toLocaleDateString('pl-PL', dateOptions)}, ${eventEndDate.toLocaleTimeString('pl-PL', timeOptions)}`
        userEventDelBtn.addEventListener('click', this.onRemoveEvent(event.id))
        userEventCloseBtn.addEventListener('click', this.onCloseEvent)
    }



    onSelectSlot = () => {
        console.log('teraz nic się nie dzieje')
    }
    render() {

        return (
            <React.Fragment>
                <h3>Mój kalendarz</h3>
                <div className="calendar">
                    <BigCalendar
                        messages={this.state.messages}
                        className="user-calendar"
                        events={this.props.userEventsFromState}
                        eventPropGetter={event => ({className: `category-${event.category} event-${event.id}`})}
                        step={15}
                        timeslots={5}
                        defaultView= 'month'
                        selectable = {true}
                        defaultDate={new Date()}
                        toolbar = {true}
                        onSelectSlot={this.onSelectSlot}
                        onSelectEvent={this.onSelectEvent}
                    />
                </div>
                <div className="user-event-window hidden hidden">
                        <div className="user-event">
                            <h1 className="user-event-title"></h1>
                            <p className="user-event-start"></p>
                            <p className="user-event-end"></p>
                            <button className="user-event-delete-btn">Usuń wydarzenie</button>
                            <button className="user-event-close-btn">Zamknij</button>
                        </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userEventsFromState: state.userEvents
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCalendar)