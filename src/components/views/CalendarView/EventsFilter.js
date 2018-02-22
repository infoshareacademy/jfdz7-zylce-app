import React from 'react';
import '../../../App.css';

class FilterEvents extends React.Component {

    getUniqueEventsCategories = () => {
        let uniqueCategories = this.props.events
            .map(event => event.category.toLowerCase())
            .filter((value, index, categoriesArray) => categoriesArray.indexOf(value) === index);
        return uniqueCategories
    };

    renderButtonsWithCategory = () => {
        let eventsCategories = this.getUniqueEventsCategories();
        return eventsCategories.map((category, index) => <button key={index} value={category} onClick={this.handleOnClickBtn}>{category}</button>)
    };

    handleOnClickBtn = event => {
        event.preventDefault();
        this.props.deliveredCategory(event.target.value);
        this.showAllEventsBtn();
    };

    showAllEventsBtn = () => document.getElementById('show-all-events-btn').classList.remove('hidden');

    handleClickOnShowAllEventsBtn = event => {
        event.preventDefault();
        this.props.clearFilter();
        event.target.classList.add('hidden');
    };

    render() {
        return (
            <React.Fragment>
            <h1>FilterEvents</h1>
                <div className="events-filter">
                    <span >
                    {this.renderButtonsWithCategory()}
                    <button id="show-all-events-btn" className="show-all-events-btn hidden" onClick={this.handleClickOnShowAllEventsBtn}>wyczyść filtr</button>
                    </span>
                </div>
            </React.Fragment>
        )
    }
}

export default FilterEvents;