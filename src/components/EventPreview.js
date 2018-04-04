import React from 'react';
import {connect} from 'react-redux';

import {addEventToUserEvents} from "../state/users";
import {removeEvent} from "../state/users"


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

        event.preventDefault()

        const title = this.props.activeEvent.title
        const description = this.props.activeEvent.description
        const start = this.props.activeEvent.start
        const end = this.props.activeEvent.end
        const category = this.props.activeEvent.category
        const picture = this.props.activeEvent.picture

        this.props.addEventToUserEvents( title, description, start, end, category, picture )

        this.setState(initialState)
        this.hidePopup(event)
    }

    removeEventFromUserEvents = (event) => {
        event.preventDefault()

        console.log('cos chce usunac!')
        console.log(this.props.activeEvent.id)
        this.props.removeEvent(this.props.activeEvent.id)
        this.hidePopup(event)


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
                            <button onClick={this.saveEventToUserEvents}>Zapisz wydarzenie</button>
                            <button onClick={this.removeEventFromUserEvents}>Usuń wyd.</button>
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
    activeEvent: state.activeEvent.activeEvent
}), {addEventToUserEvents, removeEvent})(EventPreview)

