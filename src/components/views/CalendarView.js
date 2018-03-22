import React, { Component } from 'react'
import Calendar from '../Calendar'
import FilterControls from '../FilterControls'
import {connect} from "react-redux";

// TODO Create component displaying list of tasks
class TasksView extends Component {
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
)(TasksView)