import React, { Component } from 'react'
import Calendar from '../Calendar'
import moment from 'moment'
import {connect} from "react-redux";

import FilterControls from '../FilterControls'
import {setActiveEvent} from "../../state/eventPreview";
import EventPreview from '../EventPreview'

class CalendarView extends Component {
    render() {
        return (
            <React.Fragment>
                <FilterControls />
                <Calendar events={this.props.events.map(event =>  ({
                        id: event.id,
                        title: event.title,
                        start: moment(event.start).toDate(),
                        end: moment(event.end).toDate(),
                        category: event.category,
                        description: event.description,
                        picture: event.picture
                    })
                )}/>
                <EventPreview />
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        events: state.events.data,
        activeFilterNames: state.filtering.activeFilterNames,
    }), { setActiveEvent }
)(CalendarView)