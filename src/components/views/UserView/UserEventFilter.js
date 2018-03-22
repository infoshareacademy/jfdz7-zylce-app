import React, {Component} from 'react'
import { connect } from 'react-redux'





class UserEventFilter extends Component {
    polishCategoryName = (name) => {
        switch(name) {
            case 'cinema':
                return 'kino';
            case 'theatre':
                return 'teatr';
            case 'concert':
                return 'koncert';
            default:
                return name
        }
    };

    render() {
        return (
        <React.Fragment>
        <div>
            {this.props.categories.map(
                category => (
                    <button key={category.category}
                            className={`category-${category.category} user-filter-btn`}
                    >{this.polishCategoryName(category.category)}</button>
                )
            )}

        </div>
        </React.Fragment>
        )
    }
}

export default connect(state => ({
        categories: state.users.data
    }),
    null)(UserEventFilter)