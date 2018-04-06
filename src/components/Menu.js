import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import SignOutButton from './SignOutButton';
import {eventNotification} from '../state/users';

import Reminder from '../components/images/reminder.png'


class Menu extends React.Component {

    isAdmin = () => {
        return (this.props.user.role === 'admin')
    };

    renderAdminPanelButton = () => {
        if (this.isAdmin()) {
            return (
                <button >
                    <NavLink to='/adminPanel'>
                        użytkownicy
                    </NavLink>
                </button>
            )
        }
    };

    render() {

        //TODO: Tutaj są rzeczy do wyskakującej info o dzisiejszym wydarzeniu
        let userEvents = this.props.userEvents
        eventNotification(userEvents)

        return (
            <div className='header'>
                <div id='menu' className='menu'>
                    <div className="menu-list">
                        <button>
                            <NavLink exact to='/'>
                                kalendarz
                            </NavLink>
                        </button>
                        <button>
                            <NavLink to='/userCalendar'>
                                mój kalendarz
                            </NavLink>
                        </button>
                        {this.renderAdminPanelButton()}
                    </div>
                    <div id="authentication" className="authentication">
                        <div id="logged-user-info" className="logged-user-info">
                            <div id="logged-user-welcome" className="logged-user-welcome">
                                Cześć{this.props.user.firstName.length>0 ? ' ' + this.props.user.firstName : ''}!
                                </div>
                            <div id="last-visit-info" className="last-visit-info">
                                {this.props.user.lastVisit.length===0 ? ''
                                    : `Ostatnie logowanie: ${
                                    (moment(this.props.user.lastVisit*1000).format('L'))}, ${(moment(this.props.user.lastVisit*1000).format('HH:mm:ss'))}`
                                }

                            </div>
                        </div>
                        <SignOutButton />
                        {/*TODO: Tu jest element wyskakujący jak jest jakieś wydarzenie*/}
                        <div className="notifications">
                            <span className="notification-close-btn">x</span>
                            <img className="notification-img" src={Reminder} alt="Logo" />
                            <p> Dzisiaj jest jakieś wydarzenie</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.userData.user,
        userEvents: state.users.data

    }), {eventNotification})(Menu)
