import React from 'react';
import { connect } from 'react-redux'
import { signUpWithEmail} from '../state/auth'

class SignUpForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: null
    }

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
            joinedAt: Date.now(),
            role: 'user'
        })
    };

    renderInput = fieldName => {
        return (
            <input
            name={fieldName}
            onChange={this.handleInputChange}
            />
        )
    };


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.error && <p>{this.state.error.message}</p>}
                <div>imię: {this.renderInput('firstName')}</div>
                <div>nazwisko: {this.renderInput('lastName')}</div>
                <div>email: {this.renderInput('email')}</div>
                <div>hasło: {this.renderInput('password')}</div>
                <button type='submit'> dołącz do zaplanuj.to </button>
            </form>
        );
    }
}
export default connect(null, {signUpWithEmail})(SignUpForm);