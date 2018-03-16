import React, {Component} from 'react';
import {connect} from 'react-redux'


class UserInfo extends Component {

    render() {
        return (
        <React.Fragment>
            <h2>Dane Użytkownia</h2>
            <p><strong>Imię:</strong> {this.props.userInformations.firstName}</p>
            <p><strong>Nazwisko:</strong> {this.props.userInformations.lastName}</p>
            <p><strong>Grupa:</strong> {this.props.userInformations.userGroup}</p>
            <hr />
        </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInformations: state.userInfo
    }
}

export default connect(mapStateToProps, null)(UserInfo)