import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Calendar from '../../Calendar';
import FilterControls from '../../FilterControls'
import EventPreview from '../../EventPreview';
import moment from 'moment';
import 'moment/locale/pl';
import {connect} from 'react-redux'


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class UserCalendar extends Component {
    state ={
        messages: {
            next:">",
            previous:"<",
            today:"dziś",
            month:"miesiąc",
            week:"tydzień",
            day:"dzień",
            allDay: 'Cały dzień',
            date: 'Data',
            time: 'Czas',
            event: 'Wydarzenie'},
        currentEvent: []
    }


    onRemoveEvent = (eventId) => {

        console.log('kliknąłem na button w evencie')
        this.setState({
            userEvents: this.props.userEventsFromState.filter( userEvent => userEvent.id !== eventId)
        })
    }

    render() {

        return (
            <React.Fragment>
                <FilterControls/>
                <Calendar events={this.props.userEventsFromState.map(event =>  ({
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
        userEventsFromState: state.users.data
    }), {}
)(UserCalendar)