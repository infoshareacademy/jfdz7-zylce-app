import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';

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
                <div className="users-table">
                    <table>
                        <caption>Użytkownicy zaplanuj.to</caption>
                        <tr>
                            <th>imię i nazwisko</th>
                            <th>pierwsza wizyta</th>
                            <th>ostatnia wizyta</th>
                        </tr>
                        {this.props.usersData.map((user, idx)=>(
                            <tr key={idx}>
                                <td>
                                    {user.displayName}
                                </td>
                                <td>
                                    {moment(user.joinedAt*1000).format('L')}, {moment(user.joinedAt*1000).format('HH:mm:ss')}
                                </td>
                                <td>
                                    {user.online ? `obecnie` :
                                        `${moment(user.lastVisit*1000).format('L')}, ${moment(user.lastVisit*1000).format('HH:mm:ss')}`}
                                </td>
                            </tr>))}

                    </table>
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