import React, { Component } from 'react'
import Calendar from '../Calendar'
import FilterControls from '../FilterControls'
import {connect} from "react-redux";

class CalendarView extends Component {




    render() {
        return (
            <React.Fragment>
                <FilterControls />
                <Calendar events={this.props.events}/>
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        events: state.events.data,
        activeFilterNames: state.filtering.activeFilterNames
    }), {}
)(CalendarView)