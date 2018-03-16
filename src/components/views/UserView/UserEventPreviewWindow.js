import React, {Component} from 'react';
import {connect} from 'react-redux'


class UserEventPreviewWindow extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="user-event-window hidden">
                <div className="user-event">
                <h1 className="user-event-title"></h1>
                <p className="user-event-start"></p>
                <p className="user-event-end"></p>
                <button className="user-event-delete-btn">Usuń wydarzenie</button>
                <button className="user-event-close-btn" onClick={this.props.onCloseUserEventWindow}>Zamknij</button>
                </div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseUserEventWindow: ()=> dispatch({type: 'CLOSE_USER_EVENT_WINDOW'})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEventPreviewWindow)
