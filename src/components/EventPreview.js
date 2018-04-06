import React from 'react';
import {connect} from 'react-redux';

import {toggleAddRemoveEvent} from '../state/toggleAddRemoveUserEvents';
import activeEvent from "../state/activeEvent";

const initialState = {
    title: '',
    description: '',
    start: '',
    end: '',
    category: ''
}

class EventPreview extends React.Component {
    state = initialState

    saveEventToUserEvents = (event) => {

        event.preventDefault();
        activeEvent()

        const title = this.props.activeEvent.title;
        const description = this.props.activeEvent.description;
        const start = this.props.activeEvent.start;
        const end = this.props.activeEvent.end;
        const category = this.props.activeEvent.category;
        const picture = this.props.activeEvent.picture;
        const eventId = this.props.activeEvent.id

        this.setState(initialState);
        this.hidePopup(event)

        this.props.toggleAddRemoveEvent(eventId, title, description, start, end, category, picture, eventId)
    }

    showPopup = (event) => {
        event.preventDefault();
        document.getElementById('event-preview').classList.add('event-preview');

    };

    hidePopup = (event) => {
        event.preventDefault();
        document.getElementById('event-preview-title').setAttribute('class', 'event-preview-title');
        document.getElementById('event-preview').classList.add('hidden');
        document.getElementById('event-preview-title').innerText = '';
        document.getElementById('event-preview-date').innerText = '';
        document.getElementById('event-preview-picture').innerText = '';
    };


    render() {

        return (
            <React.Fragment>


                <div id="event-preview" className="event-preview hidden" data-event-preview="event-preview">
                    <div className="event-preview-inner">
                        <div id="event-preview-title" className="event-preview-title">
                        </div>
                        <div id="event-preview-date" className="event-preview-date">

                        </div>
                        <div id="event-preview-dsc" className="event-preview-dsc">
                            <div id="event-preview-picture" className="event-preview-picture">

                            </div>
                            <div id="event-preview-description" className="event-preview-description" />
                        </div>
                        <div id="event-preview-user-actions" className="event-preview-user-actions">

                        </div>
                        <div id="event-preview-btns" className="event-preview-btns">
                            <button className="event-add-remove-btn" onClick={this.saveEventToUserEvents}>Dodaj / Usuń wydarzenie</button>
                            <button onClick={this.hidePopup}>Wróc do kalendarza wydarzeń</button>
                        </div>
                        <a id="close-event-preview" className="close-event-preview" onClick={this.hidePopup} href=''>x</a>
                    </div>
                </div>
                {this.showPopup}
            </React.Fragment>
        )
    }
}

export default connect(state => ({
    activeEvent: state.activeEvent.activeEvent,
    userEvents: state.users.data
}), {toggleAddRemoveEvent})(EventPreview)

