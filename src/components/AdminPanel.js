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
                        {this.props.usersData.map((user, idx)=> {
                            if (user.role !== 'admin') {
                                return (<tr key={idx}>
                                    <td className="users-table-name">
                                    {(user.displayName.length < 2 ? '-----' : user.displayName)}
                                    </td>
                                    <td className="users-table-date">
                                    {moment(user.joinedAt*1000).format('L')}, {moment(user.joinedAt*1000).format('HH:mm:ss')}
                                    </td>
                                    <td className="users-table-date">
                                    {user.online ? `obecnie` :
                                        `${moment(user.lastVisit*1000).format('L')}, ${moment(user.lastVisit*1000).format('HH:mm:ss')}`}
                                    </td>
                                </tr>)
                            }
                        })}

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