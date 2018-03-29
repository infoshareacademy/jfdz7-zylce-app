import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../state/auth'

class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.firstName,
            this.state.lastName,
            )
            .catch(error => this.setState({ error }))
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    }

    renderInput(fieldName, type = 'text') {
        return (
            <input
                className="auth-input"
                name={fieldName}
                value={this.state[fieldName]}
                type={type}
                onChange={this.handleChange}
            />
        )
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit} className="sig-up-form">
                <h2>Zapisz się do nas</h2>
                {this.state.error && <p>{this.state.error.message}</p>}
                <div>Email: {this.renderInput('email')}</div>
                <div>Hasło: {this.renderInput('password', 'password')}</div>
                <div>Imię: {this.renderInput('firstName')}</div>
                <div>Nazwisko: {this.renderInput('lastName')}</div>
                <button>Zarejestruj się</button>
            </form>
            </div>
        )
    }
}
export default connect(null, { signUp })(SignUpForm)
