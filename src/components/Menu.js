import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

import SignOutButton from './SignOutButton';

const options = [
    {
        path: '/',
        label: 'kalendarz',
        options: {
            exact: true
        }
    },
    {
        path: '/userCalendar',
        label: 'moje wydarzenia'
    },
    {
        path: '/signIn',
        label: 'signIn'
    },
    {
        path: '/signUp',
        label: 'signUp'
    },
];

const defaultOptions = {};


class Menu extends React.Component {

    render() {
        return (
            <div className='header'>
                <div id='menu' className='menu'>
                    <div className="menu-list">
                        {options.map((option, index) => (
                            <button key={index}>
                                <NavLink
                                    exact={(option.options || defaultOptions).exact}
                                    to={option.path}
                                >
                                    {option.label}
                                </NavLink>
                            </button>
                        ))}
                    </div>
                    <div id="authentication" className="authentication">
                        <div id="logged-user-info" className="logged-user-info">
                            <div id="logged-user-welcome" className="logged-user-welcome">
                                Cześć {this.props.user.firstName}!</div>
                            <div id="last-visit-info" className="last-visit-info">
                                Ostatnie logowanie: {(this.props.user.lastVisit)}
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
}), {})(Menu);
