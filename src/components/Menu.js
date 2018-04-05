import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import SignOutButton from './SignOutButton';

class Menu extends React.Component {

    isAdmin = () => {
        console.log(this.props.user.role)
        return (this.props.user.role === 'admin')
    };

    renderAdminPanelButton = () => {
        if (this.isAdmin()) {
            return (
                <button >
                    <NavLink to='/adminPanel'>
                        mój kalendarz
                    </NavLink>
                </button>
            )
        }
    }

    render() {
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
                                Cześć{' ' + this.props.user.firstName}!
                                </div>
                            <div id="last-visit-info" className="last-visit-info">
                                Ostatnie logowanie: {(moment(this.props.user.lastVisit*1000).format('L'))}, {(moment(this.props.user.lastVisit*1000).format('HH:mm:ss'))}
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
