import React from 'react'

class EventPreview extends React.Component {

    showPopup = (event) => {
        event.preventDefault();
        document.getElementById('event-preview').classList.add('event-preview');
        console.log('event select', event.title)
    };

    hidePopup = (event) => {
        event.preventDefault();
        document.getElementById('event-preview-title').setAttribute('class', 'event-preview-title');
        document.getElementById('event-preview').classList.add('hidden');
        document.getElementById('event-preview-title').innerText = '';
        document.getElementById('event-preview-date').innerText = '';
    };

    render() {
        return (
            <React.Fragment>
                <div id="event-preview" className="event-preview hidden" data-event-preview="event-preview">
                    <div className="event-preview-inner">
                        <div id="event-preview-title" className="event-preview-title"></div>
                        <div id="event-preview-date" className="event-preview-date"></div>
                        <div id="event-preview-user-actions" className="event-preview-user-actions"></div>
                        <div id="event-preview-btns" className="event-preview-btns"><button>Zapisz wydarzenie</button><button onClick={this.hidePopup}>Wróc do kalendarza wydarzeń</button></div>
                        <a id="close-event-preview" className="close-event-preview" onClick={this.hidePopup} href=''>x</a>
                    </div>
                </div>
                {this.showPopup}
            </React.Fragment>
        )
    }
}

export default EventPreview;