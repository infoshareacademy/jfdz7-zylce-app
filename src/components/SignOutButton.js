import React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../state/auth';

class SignOutButton extends React.Component {
    render() {
        return <div id="sign-out-btn" className="sign-out-btn">
            <button onClick={() => this.props.signOut()}>Wyloguj się</button>
        </div>
    }
}

export default connect(state => ({
    user: state.auth.user
}), { signOut })(SignOutButton)