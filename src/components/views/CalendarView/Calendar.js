import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/nb';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from './dataForTest/events'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],

        };
    }

    render() {
        return (
            <React.Fragment>
                <h1>kalendarz</h1>
                <BigCalendar
                    culture='pl'
                    events={events}
                />
            </React.Fragment>
        )
    }
};

export default Calendar