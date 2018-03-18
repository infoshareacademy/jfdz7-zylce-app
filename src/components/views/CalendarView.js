import React, { Component } from 'react'
import Calendar from '../Calendar'
import FilterControls from '../FilterControls'

// TODO Create component displaying list of tasks
class TasksView extends Component {
    render() {
        return (
            <React.Fragment>
                <FilterControls />
                <Calendar />
            </React.Fragment>
        )
    }
}

export default TasksView