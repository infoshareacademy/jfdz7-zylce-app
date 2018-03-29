import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../state/auth'

class SignInForm extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props
            .signIn(this.state.email, this.state.password)
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
            <form onSubmit={this.handleSubmit} className="sig-up-form">
                <h2>Zaloguj się.</h2>
                {this.state.error && <p>{this.state.error.message}</p>}
                <div><span className="auth-input-name">Email:</span> {this.renderInput('email')}</div>
                <div><span className="auth-input-name">Hasło:</span> {this.renderInput('password', 'password')}</div>
                <button>Zaloguj się</button>
            </form>
        )
    }
}

export default connect(null, { signIn })(SignInForm)
