import React from 'react'
import './Filterbar.css'

const FilterBar = ({ filters, toggleFilter }) => {
    const categories = ["films", "books", "postpunkpoetry"]

    return (
        <div className="filter-bar">
            {categories.map((category) => (
                <button key={category} className={`filter-btn ${filters.includes(category) ? "active" : ""}`} onClick={() => toggleFilter(category)}>
                    {category}
                </button>
            ))}
        </div>
    )
}

export default FilterBar