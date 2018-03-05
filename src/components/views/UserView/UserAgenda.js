import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import userEvents from '../../../data/userEvents';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))



class UserAgenda extends Component {

    state = {
        userEvents: userEvents
    };

    //Jakoś trzeba funkcję skonstruować żeby zmieniała state po dodaniu do tablicy
    //eventu.

    onHandleShowEventDescription = (event) => {
        event.preventDefault()
        console.log('show description')
        const eventDesc = document.querySelector('.user-event-description');
        const eventDescBtn = document.querySelector('.user-event-description-btn');

        if (eventDesc.style.display === "none") {
            eventDesc.style.display = "block";
            eventDescBtn.innerText = '...pokaż mniej';
        } else {
            eventDesc.style.display = "none";
            eventDescBtn.innerText = '...pokaż więcej';
        }
        // eventDesc.style.display = 'block';
        // eventDescBtn.innerText = '...pokaż mniej';
    }

    render() {
        return (
            <React.Fragment>
                <h3>Moje wydarzenia</h3>
                <table>
                    <thead>
                    <th>Nazwa wydarzena</th>
                    <th>Akcja</th>
                    </thead>
                    <tbody>
                    {this.state.userEvents.map( event => {
                        return <tr key={event.id} className={`filter-${event.category}`}>
                            <td>
                                {event.title} <button className="user-event-description-btn" onClick={this.onHandleShowEventDescription}>...pokaż więcej</button>
                                <div className="user-event-description">
                                    <strong>Kiedy:</strong> "Tutaj będzie data"
                                    <br/>
                                    <strong>Opis:</strong> {event.desc}
                                </div>
                            </td>
                            <td>
                                <button className="user-event-delete-btn" onClick={}>Usuń</button>
                            </td>
                        </tr>


                    })}
                    </tbody>
                </table>

                {/*<BigCalendar*/}
                    {/*events={userEvents}*/}
                    {/*step={15}*/}
                    {/*timeslots={4}*/}
                    {/*defaultView="agenda"*/}
                    {/*defaultDate={new Date()}*/}
                    {/*toolbar = {false}*/}
                    {/*popup*/}
                    {/*selectable = {true}*/}
                    {/*onSelectSlot={this.onSelectedEvent}*/}
                    {/*onSelectEvent={this.onSelectedEvent}*/}
                {/*/>*/}

            </React.Fragment>
        )
    }
}

export default UserAgenda