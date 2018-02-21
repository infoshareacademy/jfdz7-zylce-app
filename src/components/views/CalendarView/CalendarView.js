import React, { Component } from 'react'
import Calendar from './Calendar'
import events from "./dataForTest/events";
import EventsFilter from "./EventsFilter";



class CalendarView extends Component {
    state = {
        events: events,
    };

    filterEvents = category => event => event.category === category;

    showFilteredEvents = (value) => {
        console.log(value)
        console.log(this.state.events.filter(this.filterEvents(value)))
        this.setState({
            events: this.state.events.filter(this.filterEvents(value))
        })

    };

    render() {
        return (
            <React.Fragment>
                <p>Calendar View</p>
                <EventsFilter events={this.state.events} deliveredCategory={this.showFilteredEvents}/>
                <Calendar id="calendar" events={this.state.events}/>
            </React.Fragment>
        )
    }
}

export default CalendarView