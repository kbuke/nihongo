import { useEffect, useState } from "react";
import "./PrefectureRatings.css";

import NewPrefectureReview from "./NewPrefectureReview";

function PrefectureRatings({
    appData,
    prefectureName,
    prefectureContainerSelection,
    selectedPrefectureOption,
    setSelectedPrefectureOption,
    specificPrefectureId
}) {
    const [filterPrefectureRating, setFilterPrefectureRating] = useState([]);
    const [averageRatings, setAverageRatings] = useState([]);
    const [newRating, setNewRating] = useState(false)
    const [categoryId, setCategoryId] = useState([])
    const [categoryType, setCategoryType] = useState("")

    const userId = appData.loggedUser.id
  
    const prefectureId = specificPrefectureId
    console.log(`User ${userId} is reviewing prefecture ${prefectureId} for category ${categoryId}`)

    const handleClick = (e, categoryId, categoryName) => {
        e.preventDefault()
        setCategoryId(categoryId)
        setNewRating(true)
        setCategoryType(categoryName)
    }

    const renderedOptions = prefectureContainerSelection.map((object, index) => (
        <button 
            key={index}
            className={`renderPrefectureInfoOptionButton ${selectedPrefectureOption === object ? "selectedPrefectureInfoOptionButton" : ""}`}
            onClick={() => setSelectedPrefectureOption(object)}
        >
            {object}
        </button>
    ));

    const allPrefectureCategories = appData.allPrefectureCategories;

    useEffect(() => {
        const filteredRatings = appData.allPrefectureCategoryReviews.filter(review => review.prefecture_id === specificPrefectureId);
        setFilterPrefectureRating(filteredRatings);
    
        const categoryRatings = {};
    
        filteredRatings.forEach(review => {
            const category = review.review_category.category;
            if (!categoryRatings[category]) {
                categoryRatings[category] = { total: 0, count: 0 };
            }
            categoryRatings[category].total += review.rating;
            categoryRatings[category].count += 1;
        });
    
        const avgRatings = allPrefectureCategories.map((category, index) => {
            console.log(category)
            const categoryName = category.category;
            const ratings = categoryRatings[categoryName];
            const averageRating = ratings ? (ratings.total / ratings.count).toFixed(1) : "No Ratings";
            return {
                id: index + 1, // Add numerical ID starting from 1
                category: categoryName,
                averageRating
            };
        });
    
        setAverageRatings(avgRatings);
    }, [appData.allPrefectureCategoryReviews, specificPrefectureId]);
    

    console.log(averageRatings)


    const renderRatings = averageRatings.map((categoryRating, index) => (
        <div key={index} className="ratingCategory">
            <h3 id="averageRatingTitle">{categoryRating.category}</h3>
            <p id="averageRatingRendered">Average Rating: {categoryRating.averageRating} ⭐️</p>
            <button 
                id="averageRatingButton"
                onClick={(e) => handleClick(e, categoryRating.id, categoryRating.category)}
            >
                Rate {prefectureName}'s {categoryRating.category}
            </button>
        </div>
    ));

    return (
        <div id="extendedPrefectureRatingContainer">
            {newRating ? 
                <NewPrefectureReview 
                    userId={userId}
                    prefectureId={prefectureId}
                    categoryId={categoryId}
                    appData={appData}
                    setNewRating={setNewRating}
                    prefectureName={prefectureName}
                    categoryType={categoryType}
                />
                :
                <div id="viewPrefectureRatings">
                    <h2 id="prefectureRatingHeader">{prefectureName} Ratings</h2>

                    <div id="prefectureRatingGridOptions">
                        {renderedOptions}
                    </div>

                    <div id="prefectureRatingGrid">
                        {renderRatings.reduce((rows, item, index) => {
                            if (index % 2 === 0) {
                                rows.push([]);
                            }
                            rows[rows.length - 1].push(item);
                            return rows;
                        }, []).map((row, rowIndex) => (
                            <div key={rowIndex} className="ratingRow">
                                {row}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default PrefectureRatings;

