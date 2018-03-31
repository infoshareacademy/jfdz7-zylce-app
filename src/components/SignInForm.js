import React from 'react';
import { connect } from 'react-redux';
import { signInWithEmail } from "../state/auth";

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
            lastVisit: Date.now(),
        })
    };

    inputRender = fieldName => {
        return (
            <input
                name={fieldName}
                onChange={this.handleInputChange}
            />
        )
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.error && <p>{this.state.error.message}</p>}
                <div>email: {this.inputRender('email')}</div>
                <div>hasło: {this.inputRender('password')}</div>
                <button type='submit'> zaloguj </button>
            </form>
        )
    }
}

export default connect(null, {signInWithEmail})(SignIn);