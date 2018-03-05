import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import users from '../../../data/users';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class UserAgenda extends Component {

    state = {
        user: users[0]
    };

    eventFilterCinema = () => {
        console.log('filtr na kino');
        this.setState({
            user: this.state.user.userEvents.filter( event => event.category === 'cinema')
        })
    };
    eventFilterTheatre = () => {
        console.log('filtr na teatr');
        this.setState({
            user: this.state.user.userEvents.filter( event => event.category === 'theatre')
        })
    };
    eventFilterConcert = () => {
        console.log('filtr na koncert');
        this.setState({
            user: this.state.user.userEvents.filter( event => event.category === 'concert')
        })
    };


    showEventDescription = () => {
        console.log('show description')
        const eventDesc = document.querySelector('.users-event-description');
        const eventDescBtn = document.querySelector('.users-event-description-btn');

        if (eventDesc.style.display === "none") {
            eventDesc.style.display = "block";
            eventDescBtn.innerText = '...pokaż mniej';
        } else {
            eventDesc.style.display = "none";
            eventDescBtn.innerText = '...pokaż więcej';
        }
        console.log(this.state.user[0].user);

        // tu może coś zrobić ze statem czyli np description na hidden i w if zmieniac na block i tak na zmiane
    }

    removeEvent = (eventId) => {
        console.log(eventId);
        console.log(this.state.user[0].userEvents);

        // this.setState({
        //     user: this.state.user[0].userEvents.filter( event => event.id !== eventId )
        // })
    }



    render() {

        return (
            <React.Fragment>
                <h3>Moje wydarzenia</h3>
                <div className="user-agenda-filter">
                    <button className="category-cinema" onClick={this.eventFilterCinema}>Kino</button>
                    <button className="category-concert" onClick={this.eventFilterConcert}>Koncert</button>
                    <button className="category-theatre" onClick={this.eventFilterTheatre}>Teatr</button>
                </div>
                <table>
                    <thead>
                    <th>Nazwa wydarzena</th>
                    </thead>
                    <tbody>
                    {this.state.user.userEvents.map( event => {
                        return <tr key={event.id} className={`category-${event.category}`}>
                            <td>
                                {event.title} <button className="user-event-description-btn" onClick={this.showEventDescription}>...pokaż więcej</button>
                                <button className="user-event-delete-btn" onClick={()=> {this.removeEvent(event.id)}}>Usuń</button>

                                <div className="user-event-description">
                                    <strong>Kiedy:</strong> "Tutaj będzie data"
                                    <br/>
                                    <strong>Opis:</strong> {event.desc}
                                </div>
                            </td>
                        </tr>


                    })}
                    </tbody>
                </table>

            </React.Fragment>
        )
    }
}

export default UserAgenda