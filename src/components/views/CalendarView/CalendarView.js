import React, { Component } from 'react'
import Calendar from './Calendar'
import events from "../../../data/events";
import EventsFilter from "./EventsFilter";


class CalendarView extends Component {
    state = {
        allEvents: events,
        events: events,
        filterCategories: []
    };

    filterEvents = category => event => event.category === category;

    showFilteredEvents = (value) => {
        this.setState({
            filterCategories: [...this.state.filterCategories, value],
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
                <EventsFilter events={this.state.events} filterCategories={this.state.filterCategories} deliveredCategory={this.showFilteredEvents} clearFilter={this.showAllEvents}/>
                <Calendar id="calendar" events={this.state.events}/>
            </React.Fragment>
        )
    }
}

export default CalendarView;
