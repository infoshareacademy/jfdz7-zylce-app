import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import SignOutButton from './SignOutButton';

class Menu extends React.Component {

    state = {
        activeLink: true,
        dwa: ''
    }

    handleActiveLinkChange = event => {
        // event.preventDefault();
        this.setState({
           activeLink: !this.state.activeLink,
            dwa: event.target.dataset.path
        })
    }

    isAdmin = () => {
        return (this.props.user.role === 'admin')
    };

    renderAdminPanelButton = () => {
        if (this.isAdmin()) {
            return (
                <button >
                    <Link
                        data-path="adminPanel" onClick={this.handleActiveLinkChange} activeClassName="active"
                        className={this.state.dwa === "adminPanel" ? "active" : " "}
                        to='/adminPanel'
                    >
                        użytkownicy
                    </Link>
                </button>
            )
        }
    };

    render() {
        return (
            <div className='header'>
                <div id='menu' className='menu'>
                    <div className="menu-list">
                        <button>
                            <Link data-path="/" onClick={this.handleActiveLinkChange} activeClassName="active"
                                     className={this.state.dwa === "/" ? "active" : " "}
                                     exact to='/'>
                                kalendarz
                            </Link>
                        </button>
                        <button >
                            <Link data-path="userCalendar"
                                     onClick={this.handleActiveLinkChange} activeClassName="active"
                                     className={this.state.dwa === "userCalendar" ? "active" : " "}
                                     to='/userCalendar'>
                                mój kalendarz
                            </Link>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
    user: state.userData.user
}), {})(Menu)
