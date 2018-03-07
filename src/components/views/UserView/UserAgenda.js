import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))



class UserAgenda extends Component {

    state = {
        userEvents: this.props.userAgenda,
        initialUsers: this.props.userAgenda,
    };

    eventFilterCinema = () => {
        console.log('filtr - kino');
        this.setState({
            userEvents: this.state.userEvents.filter( userEvent => userEvent.category === 'cinema')
        })

    };
    eventFilterTheatre = () => {
        console.log('filtr - teatr');
        this.setState({
            userEvents: this.state.userEvents.filter( userEvent => userEvent.category === 'theatre')
        })
    };
    eventFilterConcert = () => {
        console.log('filtr - koncert');
        this.setState({
            userEvents: this.state.userEvents.filter( userEvent => userEvent.category === 'concert')
        })
    };
    eventFilterRefresh = () => {
        console.log('filtr - wyczyść');
        this.setState({
            userEvents: this.state.initialUsers
        })
    };

    removeEvent = (eventId) => {
        console.log(eventId);
        this.setState({
            userEvents: this.state.userEvents.filter( userEvent => userEvent.id !== eventId)
        })
        console.log(this.state.userEvents);

    }



    render() {

        return (
            <React.Fragment>
                <h3>Moje wydarzenia</h3>
                <div className="user-agenda-filter">
                    <button className="category-cinema" onClick={this.eventFilterCinema}>Kino</button>
                    <button className="category-concert" onClick={this.eventFilterConcert}>Koncert</button>
                    <button className="category-theatre" onClick={this.eventFilterTheatre}>Teatr</button>
                    <button className="category-refresh" onClick={this.eventFilterRefresh}>Wyczyść</button>
                </div>
                    <ul className="user-events">
                    {this.state.userEvents.map( event => {
                        return <li key={event.id}>
                                <div className={`user-event-title category-${event.category}`}>
                                    {event.title}
                                    <button className="user-event-delete-btn" onClick={()=> {this.removeEvent(event.id)}}>Usuń</button>
                                </div>
                                <div className="user-event-description">
                                    <strong>Kiedy:</strong> {event.start.toLocaleString()}
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

export default UserAgenda