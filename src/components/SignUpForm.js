import React from 'react';
import { connect } from 'react-redux'
import moment from "moment/moment";

import { signUpWithEmail, toggleForm} from '../state/auth'

class SignUpForm extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: null
    };

    onSubmit = event => {
    event.preventDefault();
        console.log(this.state);
        const { email, password, error, ...userData } = this.state;

        this.props
            .signUpWithEmail(email, password, userData)
            .catch(error => this.setState({ error }))
    };

    handleInputChange = ({ target: { name, value } }) => {
        console.log(value);
        console.log(this.state);
        this.setState({
            [name]: value,
            joinedAt: moment().unix(),
            lastVisit: moment().unix(),
            role: 'user',
            displayName: this.state.firstName + ' ' + this.state.lastName,
        })
    };

    renderInput = fieldName => {
        if (fieldName === 'password') {
            return (<div className="sign-input">
                <input
                    name={fieldName}
                    onChange={this.handleInputChange}
                    type={fieldName}
                />
            </div>)
        } else {
            return (<div className="sign-input">
                <input
                    name={fieldName}
                    onChange={this.handleInputChange}
                    type="text"
                />
            </div>)
        }
    };

    render() {
        return (
            <div className="sign-up-modal">
                <div className="sign-up-inner">
                    <div className="sign-form">
                        <form onSubmit={this.onSubmit}>
                            {this.state.error && <p>{this.state.error.message}</p>}
                            <div className="sign-info">imię</div>
                            <div>{this.renderInput('firstName')}</div>
                            <div className="sign-info">nazwisko</div>
                            <div>{this.renderInput('lastName')}</div>
                            <div className="sign-info">email</div>
                            <div>{this.renderInput('email')}</div>
                            <div className="sign-info">hasło</div>
                            <div>{this.renderInput('password')}</div>
                            <div className="sign-in-button"><button type='submit'> dołącz do zaplanuj.to </button></div>
                        </form>
                    </div>
                    <a id="close-sign-up-modal" className="close-sign-up-modal" onClick={this.props.toggleForm} href=''>x</a>
                </div>
            </div>
        );
    }
}
export default connect(null, {signUpWithEmail, toggleForm})(SignUpForm)