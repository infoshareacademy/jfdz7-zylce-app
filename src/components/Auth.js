import React, { Component } from 'react'
import { connect } from 'react-redux'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

class Auth extends Component {
    render() {
        return this.props.user === null ? (
            <div>
                <SignInForm />
                <SignUpForm />
            </div>
        ) : (
            this.props.children
        )
    }
}

export default connect(state => ({
    user: state.auth.user
}))(Auth)