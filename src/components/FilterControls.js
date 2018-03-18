import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateFilter, deactivateFilter } from '../state/filtering'

class FilterControls extends Component {
    translateCategoryName = (categoryName) => {
        switch(categoryName) {
            case 'cinema':
                return 'kino';
            case 'theatre':
                return 'teatr';
            case 'concert':
                return 'koncert';
            default:
                return categoryName
        }
    };

    setActive = (event) => {
        event.preventDefault();
        event.target.classList.add('active')
        document.getElementById('show-all-events-btn').classList.remove('hidden');

    };

    clearActiveClassFromFilterButtons = () => {
        let buttons = document.getElementsByClassName('filter-btn');
        for (let i=0; i<buttons.length; i++) {
            buttons[i].classList.remove('active') ;
        }
    };

    handleResetFilters = (event) => {
        event.preventDefault();
        this.clearActiveClassFromFilterButtons();
        this.props.deactivateFilter();
        document.getElementById('show-all-events-btn').classList.add('hidden');
    };

    render() {
        return (
            <div className="events-filter">
                <div className="filter-message">
                    Filtruj wydarzenia
                </div>
                <div id="filter-buttons" className="filter-buttons">
                {this.props.categoryNames.map(categoryName => (
                    <button
                        key={categoryName}
                        className={`category-${categoryName} filter-btn`} value={categoryName}
                        onClick={(event) => {
                            this.setActive(event);
                            this.props.activateFilter(categoryName);
                            }
                        }
                    >
                        {this.translateCategoryName(categoryName)}
                    </button>
                ))}
                <button
                    id="show-all-events-btn"
                    className="show-all-events-btn hidden"
                    onClick={this.handleResetFilters}
                    >wyczyść filtry</button>
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({
        categoryNames: Object.keys(
            state.events.data
                .map(event => event.category)
                .reduce((uniqueCategoryNames, nextCategoryName) => {
                    uniqueCategoryNames[nextCategoryName] = true
                    return uniqueCategoryNames
                }, {})
        )
    }),
    { activateFilter, deactivateFilter }
)(FilterControls)