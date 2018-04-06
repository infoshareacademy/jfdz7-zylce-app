import React, { Component } from 'react';
import {connect} from 'react-redux';

import {toggleAddRemoveEvent} from '../../../state/toggleAddRemoveUserEvents';

import moment from 'moment'
moment.locale('pl');

class UserAgenda extends Component {
    translateCategoryName = (categoryName) => {
        switch(categoryName) {
            case 'cinema':
                return 'Kino';
            case 'theatre':
                return 'Teatr';
            case 'concert':
                return 'Koncert';
            default:
                return categoryName
        }
    };

    handleRemoveClick = event => {
        const eventId = event.target.dataset.eventId
        this.props.toggleAddRemoveEvent(eventId)
    }

    render() {
        const { activeFilterNames } = this.props

        return (
            <React.Fragment >
                <h3>Lista wydarzeń dodanych do mojego kalendarza</h3>
                <ul className="user-events">
                    {this.props.userAgendaFromState
                        .filter(
                            event =>
                                activeFilterNames.length === 0
                                    ? true
                                    : activeFilterNames.includes(event.category)
                        )
                        .map( event => {
                            return(
                                <li key={event.id}>
                                    <div className={`user-agenda-title category-${event.category}`}>
                                        {event.title} ({this.translateCategoryName(event.category)})
                                        <button
                                            className="user-event-delete-btn"
                                            data-event-id={event.id}
                                            onClick={this.handleRemoveClick}
                                        >Usuń
                                        </button>
                                    </div>
                                    <div>
                                        <div className="user-event-date">
                                            <span className="user-event-date-start">
                                                <strong>Start:</strong>{moment(event.start).format('LLLL')}
                                            </span>
                                            <span className="user-event-date-end">
                                                <strong>Koniec:</strong> {moment(event.end).format('LLLL')}
                                            </span>
                                        </div>
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
        activeFilterNames: state.filtering.activeFilterNames,
        userAgendaFromState: state.users.data
    }), { toggleAddRemoveEvent}
)(UserAgenda)