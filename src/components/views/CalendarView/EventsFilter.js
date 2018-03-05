import React from 'react';
import '../../../App.css';

class FilterEvents extends React.Component {
    state = {
        eventsCategories: this.props.events
            .map(event => event.category.toLowerCase())
            .filter((value, index, categoriesArray) => categoriesArray.indexOf(value) === index)
    };

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

    renderButtonsWithCategory = () => {
        let eventsCategories = this.state.eventsCategories;
        return eventsCategories.map((category, index) => <button key={index} className={`category-${category} filter-btn`} value={category} onClick={this.handleOnClickBtn}>{this.translateCategoryName(category)}</button>)
    };

    clearActiveClassFromFilterButtons = () => {
        let buttons = document.getElementsByClassName('filter-btn');
        for (let i=0; i<buttons.length; i++) {
            buttons[i].classList.remove('active') ;
        }
    };

    handleOnClickBtn = (event) => {
        event.preventDefault();
        this.clearActiveClassFromFilterButtons();
        event.target.classList.add('active');
        this.props.deliveredCategory(event.target.value);
        document.getElementById('show-all-events-btn').classList.remove('hidden');
        this.renderButtonsWithCategory()
    };

    handleShowAllClick = (event) => {
        event.preventDefault();
        this.clearActiveClassFromFilterButtons();
        this.props.clearFilter();
        document.getElementById('show-all-events-btn').classList.add('hidden');
    };

    render() {
        return (
            <React.Fragment>
            <h1>FilterEvents</h1>
                <div className="events-filter">
                    <div className="filter-message">
                        Filtruj wydarzenia
                    </div>
                    <div id="filter-buttons" className="filter-buttons">
                    {this.renderButtonsWithCategory()}
                    <button id="show-all-events-btn" className="show-all-events-btn hidden" onClick={this.handleShowAllClick}>wyczyść filtr</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FilterEvents;