import React, { useState } from 'react';

import "./SpecificBusinesses.css";

function SpecificBusinesses({
    copyPrefectureBusinesses,
    selectedButton
}) {

    const [filterButtons, setFilterButtons] = useState("Ratings");

    const selectedFilterButton = filterButtons === "Ratings" ? 
        copyPrefectureBusinesses.sort((a, b) => {
            if (a.averageRating === 'N/A') return 1;
            if (b.averageRating === 'N/A') return -1;
            return b.averageRating - a.averageRating;
        })
        :
        copyPrefectureBusinesses.sort((a, b) => b.numberReviews - a.numberReviews);

    const filteredBusinesses = selectedFilterButton.filter(business =>
        business.business_types.some(businessType =>
            businessType.registered_type.business_type === selectedButton
        )
    );

    const renderBusinessCards = filteredBusinesses.map((business, index) => (
        <div
            key={index}
            className='prefectureBusinessCard'
        >
            <img
                className='prefectureBusinessesImg'
                alt="prefecture businesses image"
                src={business.profile_picture}
            />
            <h3 className='businessName'>{business.name}</h3>
            <div id='businessInfoGrid'>
                <div id='leftBusinessInfo'>
                    <h5 id="businessPrefectureInfo">{business.card_info}</h5>
                </div>

                <div id='rightBusinessInfo'>
                    <div id='reviewGrid'>
                        <h4>{business.averageRating} ⭐️ </h4>
                        <h4 className="numberReviews">({business.numberReviews})</h4>
                    </div>
                </div>
            </div>
            <h5 id="businessRegisterDate">Registered: {business.date_registered.slice(0, 10)}</h5>
        </div>
    ));

    return (
        <div id="prefectureBusinessesContainer">
            <div id="specificBusinessButtonContainer">
                <button 
                    id="sortRatings"
                    className={filterButtons == "Ratings" ? "selectedCategory" : "sortBusinessButton"}
                    onClick={() => setFilterButtons("Ratings")}
                >
                    Show Highest Rated {selectedButton}s
                </button>

                <button 
                    id="sortViews"
                    className={filterButtons == "Views" ? "selectedCategory" : "sortBusinessButton"}
                    onClick={() => setFilterButtons("Views")}
                >
                    Show Most Visited {selectedButton}s
                </button>

                <button
                    id="sortDate"
                    className={filterButtons == "Date" ? "selectedCategory" : "sortBusinessButton"}
                    onClick={() => setFilterButtons("Date")}
                >
                    Show Newly Registered {selectedButton}s
                </button>
            </div>

            <div className='prefectureBusinesses'>
                {renderBusinessCards} 
            </div>
        </div>
    );
}

export default SpecificBusinesses;