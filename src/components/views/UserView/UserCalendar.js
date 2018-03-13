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
                <div className="calendar">
                    <BigCalendar
                        className="user-calendar"
                        events={this.state.userEvents}
                        eventPropGetter={event => ({className: `category-${event.category} event-${event.id}`})}
                        step={15}
                        timeslots={5}
                        defaultView= 'month'
                        selectable = {true}
                        defaultDate={new Date()}
                        toolbar = {true}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default UserCalendar