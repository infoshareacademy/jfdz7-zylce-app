import React, { Component } from 'react'
import Calendar from '../Calendar'
import moment from 'moment'
import FilterControls from '../FilterControls'
import {connect} from "react-redux";

class CalendarView extends Component {




    render() {
        return (
            <React.Fragment>
                <FilterControls />
                <Calendar events={this.props.events.map(event =>  ({
                        title: event.title,
                        start: moment(event.start).toDate(),
                        end: moment(event.end).toDate(),
                        category: event.category,
                        description: event.description,
                        picture: event.picture

                    })
                )}/>
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        events: state.events.data,
        test: {
          a: 'a'
        },
        activeFilterNames: state.filtering.activeFilterNames
    }), {}
)(CalendarView)