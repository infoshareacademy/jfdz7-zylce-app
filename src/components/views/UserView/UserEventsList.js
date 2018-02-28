import React, { Component } from 'react';

import InitialUserEvents from './userEventsData/userEvents';
import UserEvents from './userEventsData/userEvents'

class UserEventsList extends Component {
    state = {
        userEvents: UserEvents
    };

    initialEventsState = ()=>{
        this.setState({
            userEvents: InitialUserEvents
        })
    }

    filterEventCinema = () => {
        console.log('filtr na kino');
        this.setState({
            userEvents: this.state.userEvents.filter( event => event.category === 'movie')
        })

    };
    filterEventSport = () => {
        console.log('filtr na sport');
        this.setState({
            userEvents: this.state.userEvents.filter( event => event.category === 'sport')
        })
    };
    filterEventConcert = () => {
        console.log('filtr na koncert');
        this.setState({
            userEvents: this.state.userEvents.filter( event => event.category === 'concert')
        })
    };


    render() {
        return (
            <React.Fragment>
                <div className="my-events-list">
                    <button className="my-events-btn" onClick={this.filterEventCinema}>Kino</button>
                    <button className="my-events-btn" onClick={this.filterEventSport}>Sport</button>
                    <button className="my-events-btn" onClick={this.filterEventConcert}>Koncert</button>
                    <button className="my-events-btn" onClick={this.initialEventsState}>Wyczyść</button>
                </div>
                <ul className="event-list">
                    {this.state.userEvents.map( event => {
                        return <li key={event.id} className={`filter-${event.category}`}><strong>{event.title}</strong></li>
                    })}
                </ul>
            </React.Fragment>
        );
    }
}

export default UserEventsList;