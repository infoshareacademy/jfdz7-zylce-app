import React, { Component } from 'react';
import {connect} from 'react-redux'

import UserEventFilter from './UserEventFilter'

import {removeEvent} from "../../../state/users"


class UserAgenda extends Component {

    handleRemoveClick = event => {
        const eventId = event.id
        this.props.removeEvent(eventId)
    }

    render() {
        let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let timeOptions = {hour: 'numeric', minute: 'numeric'};

        return (
            <React.Fragment >
                <h3>Moje wydarzenia</h3>
                <UserEventFilter/>
                <ul className="user-events">
                    {this.props.userAgendaFromState.map( event => {
                        return <li key={event.id} className={`user-event-${event.category}`}>
                            <div className={`user-agenda-title category-${event.category}`}>
                                {event.title}
                                <button className="user-event-delete-btn" onClick={()=>this.handleRemoveClick(event)}>Usuń</button>
                            </div>
                            <div className="user-event-description">
                                <strong>Start:</strong> {event.start.toLocaleString('pl-PL', dateOptions)}, {event.start.toLocaleTimeString('pl-PL', timeOptions)}
                                <span> </span>
                                <strong>Koniec:</strong> {event.end.toLocaleString('pl-PL', dateOptions)}, {event.end.toLocaleTimeString('pl-PL', timeOptions)}
                                <br/>
                                <hr />
                                <strong>Opis:</strong> {event.desc}
                            </div>
                        </li>


                    })}
                </ul>

            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        userAgendaFromState: state.users.data
    }), {removeEvent}
)(UserAgenda)