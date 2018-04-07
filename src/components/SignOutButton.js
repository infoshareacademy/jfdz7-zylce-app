import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOut } from '../state/auth'

class SignOutButton extends Component {
    render() {
        return <div className="sign-out-btn" >
            <button onClick={() => this.props.signOut()}>Wyloguj się</button>
        </div>
    }
}

export default connect(null, { signOut })(SignOutButton)