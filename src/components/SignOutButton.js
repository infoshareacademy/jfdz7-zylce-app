import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOut } from '../state/auth'

class SignOutButton extends Component {
    render() {
        return <button onClick={() => this.props.signOut()}>sign out</button>
    }
}

export default connect(null, { signOut })(SignOutButton)