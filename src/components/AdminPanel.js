import React from 'react';
import {connect} from "react-redux";

import { getUsersData } from '../state/adminData';

class AdminPanel extends React.Component {

    componentDidMount = () => {
        if (this.props.user.role === 'admin') {
            this.props.getUsersData();
        } else {
            this.props.history.push('/');
        }
    };

    render() {
        return (
            <div>
            <h1>Użytkownicy</h1>
                {this.props.usersData.map(user=>(<p>{user.displayName}</p>))}
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.userData.user,
        usersData: Object.entries(
            state.adminData.usersData
        ).map(([id, values]) => ({ id, ...values}))
    }), {getUsersData})(AdminPanel);