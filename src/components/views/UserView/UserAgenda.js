import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {connect} from 'react-redux'


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))



class UserAgenda extends Component {

    state = {
        userEvents: this.props.userAgenda,
        initialUsers: this.props.userAgenda,
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
    };

    eventFilterRefresh = () => {
        console.log('filtr - wyczyść');
        this.setState({
            userEvents: this.state.initialUsers
        })
    };

    eventFilterCinema = () => {
        console.log('filtr - kino');
        this.setState({
            userEvents: this.props.userEventsFromState.filter( userEvent => userEvent.category === 'cinema')
        })

    };
    eventFilterTheatre = () => {
        console.log('filtr - teatr');
        this.setState({
            userEvents: this.props.userEventsFromState.filter( userEvent => userEvent.category === 'theatre')
        })
    };
    eventFilterConcert = () => {
        console.log('filtr - koncert');
        this.setState({
            userEvents: this.props.userEventsFromState.filter( userEvent => userEvent.category === 'concert')
        })
    };

    removeEvent = (eventId) => {
        console.log(eventId);
        this.setState({
            userEvents: this.props.userEventsFromState.filter( userEvent => userEvent.id !== eventId)
        })
        console.log(this.props.userEventsFromState);

    }
    onSelectEvent = (event) => {
        let eventStartDate = event.start;
        console.log('kliknałem agende')
        console.log(eventStartDate)
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
                                <button className="user-agenda-delete-btn" onClick={()=> {this.props.onDeleteUserEvent(event.id)}}>Usuń</button>
                            </div>
                            <div className="user-event-description">
                                <strong>Kiedy:</strong> {event.start.toLocaleString('pl-PL', dateOptions)}
                                <br/>
                                <strong>Opis:</strong> {event.desc}
                            </div>
                        </li>


                    })}
                </ul>


            </React.Fragment>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         userEventsFromState: state.userEvents
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onDeleteUserEvent: (id)=> dispatch({type: 'DELETE_USER_EVENT', eventId: id})
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(UserAgenda)

export default connect(
    state => ({
        userAgendaFromState: state.users.data[0].userEvents
    }), {}
)(UserAgenda)