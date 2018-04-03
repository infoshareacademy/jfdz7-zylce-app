import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeEvent} from "../../../state/users"

class UserAgenda extends Component {

    handleRemoveClick = event => {
        const eventId = event.target.dataset.eventId
        this.props.removeEvent(eventId)
    }

    render() {
        let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let timeOptions = {hour: 'numeric', minute: 'numeric'};

        return (
            <React.Fragment >
                <h3>Moje wydarzenia</h3>
                <ul className="user-events">
                    {this.props.userAgendaFromState.map( event => {
                        return(
                        <li key={event.id}>
                            <div className={`user-agenda-title category-${event.category}`}>
                                {event.title}
                                <button
                                    className="user-event-delete-btn"
                                    data-event-id={event.id}
                                    onClick={this.handleRemoveClick}
                                >Usuń
                                </button>
                            </div>
                            <div>
                                <strong>Start:</strong> {event.start},
                                <span> </span>
                                <strong>Koniec:</strong> {event.end}
                                <br/>
                                <hr />
                                <div className="user-event-description">
                                    <span> <strong>Opis:</strong> {event.description}</span>
                                    <img className="user-event-poster" src={event.picture}/>
                                </div>
                                </div>
                        </li>)
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