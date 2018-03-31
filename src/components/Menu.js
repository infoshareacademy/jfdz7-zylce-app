import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOutButton from './SignOutButton'

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
                        <SignOutButton />
                    </div>
                </div>

            </div>
        )
    }
}

export default Menu;
