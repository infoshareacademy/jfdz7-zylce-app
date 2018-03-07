import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class UserCalendar extends Component {
    state ={
        userEvents: this.props.userCalendar
    }
    render() {

        return (
            <React.Fragment>
                <h3>Mój kalendarz</h3>
                <BigCalendar
                    events={this.state.userEvents}
                    step={15}
                    timeslots={5}
                    defaultView= 'week'
                    selectable = {true}
                    defaultDate={new Date()}
                    toolbar = {true}
                />
            </React.Fragment>
        )
    }
}

export default UserCalendar