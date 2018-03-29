import React from 'react';
import { NavLink } from 'react-router-dom'
import SignOutButton from './SignOutButton'
import firebase from 'firebase'

const options = [
    {
        path: '/',
        label: 'Calendar',
        options: {
            exact: true
        }
    },
    {
        path: '/userCalendar',
        label: 'moje wydarzenia'
    },
];

const defaultOptions = {};


class Menu extends React.Component {
    state = {
        firstname:'',
        lastname: ''
    }


    componentWillMount(){
        const userUid = firebase.auth().currentUser.uid

        //ksywka
        const rootUserDb = firebase.database().ref().child('users');
        const userNameRef = rootUserDb.child(userUid + '/firstName');
        const userLastNameRef = rootUserDb.child(userUid + '/lastName');

        userNameRef.on('value', snapshot => {
            this.setState({
                firstname: snapshot.val(),
            })
        })
        userLastNameRef.on('value', snapshot => {
            this.setState({
                lastname: snapshot.val(),
            })
        })

    }

    render() {
        console.log('moje imie: ', this.state.firstname)
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
                       Witaj: {this.state.firstname} {this.state.lastname} <SignOutButton/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Menu;
