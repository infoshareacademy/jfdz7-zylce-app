import React from 'react';

class FilterEvents extends React.Component {

    getUniqueEventsCategories = () => {
        let uniqueCategories = this.props.events
            .map(event => event.category.toLowerCase())
            .filter((value, index, categoriesArray) => categoriesArray.indexOf(value) === index);
        return uniqueCategories
    };

    renderOptionsWithCategoriesForFilter = () => {
        let eventsCategories = this.getUniqueEventsCategories();
        return eventsCategories.map((category, idx) => <option key={idx} name={category}>{category}</option>)
    };

    render() {
        return (
            <React.Fragment>
            <h1>FilterEvents</h1>
                <div className="events-filter">
                    <select
                        name="events-category-filter"
                        onChange={({ target: { value }}) => {this.props.deliveredCategory(value)}}
                    >
                        {this.renderOptionsWithCategoriesForFilter()}
                    </select>

                </div>
            </React.Fragment>
        )
    }
}

export default FilterEvents;