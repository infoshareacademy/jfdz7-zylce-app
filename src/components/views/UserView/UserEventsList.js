import React, { Component } from 'react';

import TestData from './TestData'
import NewTestData from './TestData'

class UserEventsList extends Component {
    state = {
        events: TestData,
    };

    initnialEvenstState = ()=>{
        this.setState({
            events: NewTestData
        })
    }

    filterEventCinema = () => {
        console.log('filtr na kino');
        this.setState({
            events: this.state.events.filter( event => event.category === 'movie')
        })

    };
    filterEventSport = () => {
        console.log('filtr na sport');
        this.setState({
            events: this.state.events.filter( event => event.category === 'sport')
        })
    };
    filterEventConcert = () => {
        console.log('filtr na koncert');
        this.setState({
            events: this.state.events.filter( event => event.category === 'concert')
        })
    };


    render() {
        return (
            <React.Fragment>
                <div className="my-events-list">
                    <button className="my-events-btn" onClick={this.filterEventCinema}>Kino</button>
                    <button className="my-events-btn" onClick={this.filterEventSport}>Sport</button>
                    <button className="my-events-btn" onClick={this.filterEventConcert}>Koncert</button>
                    <button className="my-events-btn" onClick={this.initnialEvenstState}>Wyczyść</button>
                </div>

                <ul className="event-list">
                    {this.state.events.map( (myEvent)=>{
                        return <li key={myEvent.id} className={`filter-${myEvent.category}`}><strong>{myEvent.title}</strong>, <br /> kiedy: {myEvent.start}</li>
                    })}

                </ul>
            </React.Fragment>
        );
    }
}

export default UserEventsList;