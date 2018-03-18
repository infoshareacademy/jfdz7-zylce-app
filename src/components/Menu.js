import React from 'react';
import { NavLink } from 'react-router-dom'

const options = [
    {
        path: '/',
        label: 'Auth',
        options: {
            exact: true
        }
    },
    {
        path: '/calendar',
        label: 'Calendar'
    },
    {
        path: '/userCalendar',
        label: 'User Calendar'
    },
]

const defaultOptions = {}


class Menu extends React.Component {

    render() {
        return (
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <NavLink
                            exact={(option.options || defaultOptions).exact}
                            to={option.path}
                        >
                            {option.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Menu;
