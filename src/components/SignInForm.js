import React from 'react';
import { connect } from 'react-redux';

import { signInWithEmail, signInWithFb, signInWithGoogle } from "../state/auth";
import SignUpFormToggleButton from "./SignUpFormToggleButton";

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

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
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
                    nie masz konta?
                    <SignUpFormToggleButton />
                </div>
                <div className="sign-by-socials">
                    możesz również zalogować się używając swojego konta <a href onClick={this.props.signInWithFb}> Facebook </a> lub <a href onClick={this.props.signInWithGoogle}> Google </a>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(null, {signInWithEmail, signInWithFb, signInWithGoogle })(SignIn)