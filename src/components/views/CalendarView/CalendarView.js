import React, { Component } from 'react'
import Calendar from './Calendar'
import events from "../../../data/events";

class CalendarView extends Component {
    state = {
        allEvents: events,
        events: events,
        filterCategories: []
    };


    render() {
        return (
            <React.Fragment>
                <p>Calendar View</p>

                <Calendar id="calendar" />
            </React.Fragment>
        )
    }
}

export default CalendarView;
