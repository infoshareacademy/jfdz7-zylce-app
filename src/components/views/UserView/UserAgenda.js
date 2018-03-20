import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {connect} from 'react-redux'
import {removeEvent} from "../../../state/users"


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))



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
                <div className="user-agenda-filter">
                    <button className="category-cinema" onClick={this.eventFilterCinema}>Kino</button>
                    <button className="category-concert" onClick={this.eventFilterConcert}>Koncert</button>
                    <button className="category-theatre" onClick={this.eventFilterTheatre}>Teatr</button>
                    <button className="category-refresh" onClick={this.eventFilterRefresh}>Wyczyść</button>
                </div>
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