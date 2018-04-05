import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleForm} from "../state/auth";
import SignUpForm from './SignUpForm';

export class SignUpFormToggleButton extends Component {

    state = {
        showSignUpForm: false
    };

    render() {
        return (
            <React.Fragment>
                <div className="sign-up-button">
                        <button type='submit' onClick={
                            this.props.toggleForm}
                        > dołącz do zaplanuj.to!</button>
                    {this.props.showSignUpForm && (
                        <SignUpForm/>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default connect(state => ({
    showSignUpForm: state.auth.showSignUpForm
}), { toggleForm })(SignUpFormToggleButton)
