import React, { Component } from 'react'
import Calendar from './Calendar'
import events from "./dataForTest/events";
import EventsFilter from "./EventsFilter";

class CalendarView extends Component {
    state = {
        allEvents: events,
        events: events,
    };

    filterEvents = category => event => event.category === category;

    showFilteredEvents = (value) => {
        this.setState({
            events: this.state.allEvents.filter(this.filterEvents(value)),
        });
    };

    showAllEvents = () => {
        this.setState({
            events: events
        })
    };

    render() {
        return (
            <React.Fragment>
                <p>Calendar View</p>
                <EventsFilter events={this.state.events} deliveredCategory={this.showFilteredEvents} clearFilter={this.showAllEvents}/>
                <Calendar id="calendar" events={this.state.events}/>
            </React.Fragment>
        )
    }
}

export default CalendarView