import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import SignOutButton from './SignOutButton';
import {eventNotification} from '../state/users';

import Reminder from '../components/images/reminder.png'


class Menu extends React.Component {

    state = {
        activeLink: '',
        showMenu: false
    };

    toggleMenu = event => {
        if (this.state.showMenu) {
            document.getElementById('menu-list').setAttribute('style', 'display: none');
            document.getElementById('menu-list').removeAttribute('style');
        } else {
            document.getElementById('menu-list').setAttribute('style', 'display: flex;')
        }
        this.setState({
            showMenu: !this.state.showMenu
        });
    };

    handleActiveLinkChange = event => {
        this.toggleMenu();
        this.setState({
            activeLink: event.target.dataset.path,
        });
    };

    isAdmin = () => {
        return (this.props.user.role === 'admin')
    };

    renderAdminPanelButton = () => {
        if (this.isAdmin()) {
            return (
                <button data-path="adminPanel" onClick={this.handleActiveLinkChange}>
                    <Link
                        data-path="adminPanel" onClick={this.handleActiveLinkChange}
                         activeClassName="active"
                        className={this.state.activeLink === "adminPanel" ? "active" : " "}
                        to='/adminPanel'
                    >
                        użytkownicy
                    </Link>
                </button>
            )
        }
    };

    componentDidMount() {
        //TODO: Tutaj są rzeczy do wyskakującej info o dzisiejszym wydarzeniu
        let userEvents = this.props.userEvents
        eventNotification(userEvents)
    }
    render() {
        return (
            <div className='header'>
                <div id='menu' className='menu'>

                    <div id="menu-list" className="menu-list">
                        <button >
                            <Link exact to='/'
                                  className={this.state.activeLink === "/" ? "active" : " "}
                                  data-path="/"
                                  onClick={this.handleActiveLinkChange} activeClassName="active"
                            >
                                kalendarz
                            </Link>
                        </button>
                        <button >
                            <Link to='/userCalendar'
                                  className={this.state.activeLink === "userCalendar" ? "active" : " "}
                                  data-path="userCalendar"
                                  onClick={this.handleActiveLinkChange} activeClassName="active"
                            >
                                mój kalendarz
                            </Link>
                        </button>
                        {this.renderAdminPanelButton()}
                    </div>
                    <div id="authentication" className="authentication">
                        <div  className="toggle-menu-list">
                            <button onClick={this.toggleMenu}>
                                menu
                            </button>
                        </div>
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
                        <div id="notification-popup" className="notifications hidden">
                        <div className="notifications-area">
                            <span className="notification-close-btn">x</span>
                            <img className="notification-img" src={Reminder} alt="Logo" />
                            <div className="notification-messages">
                                <p className="notification-info"></p>
                                <p className="notification-tommorow-info"></p>
                            </div>
                        </div>
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
