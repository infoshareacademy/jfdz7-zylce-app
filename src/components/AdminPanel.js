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
            <h1>Widok tylko dla Admina</h1>
            <h2>Widok tylko dla Admina</h2>
            <h2>Widok tylko dla Admina</h2>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.userData.user
    }), {getUsersData})(AdminPanel);