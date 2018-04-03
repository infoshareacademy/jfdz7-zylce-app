import React from 'react';
import { connect } from 'react-redux';
import { signInWithEmail, signInWithFb } from "../state/auth";
import moment from "moment/moment";

class SignIn extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleSubmit = event => {
        event.preventDefault();

        this.props
            .signInWithEmail(this.state.email, this.state.password)
    };

    handleJoinUs = event => {
        event.preventDefault();


    };

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
            lastVisit: moment().unix(),
        })
    };

    inputRender = fieldName => {
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
            <React.Fragment>
                <div className="sign-form">
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error && <p>{this.state.error.message}</p>}
                        <div className="sign-info">e-mail</div>
                        <div>{this.inputRender('email')}</div>
                        <div className="sign-info">hasło</div>
                        <div>{this.inputRender('password')}</div>
                        <div className="sign-in-button"> <button type='submit'> zaloguj się</button></div>
                    </form>
                </div>
                <div className="sign-join-us">
                    <div>Nie masz konta? </div>
                    <div className="sign-up-button"><button type='submit' onClick={this.handleJoinUs}> dołącz do zaplanuj.to!</button></div>
                    <button type='submit' onClick={this.props.signInWithFb}> fb!</button>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(null, {signInWithEmail, signInWithFb})(SignIn);