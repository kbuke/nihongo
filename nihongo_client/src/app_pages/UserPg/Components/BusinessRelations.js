import "./BusinessRelations.css";
import BusinessReview from "./BusinessReview";
import BusinessInfoRelation from "./BusinessInfoRelation";

import { useState } from "react";

function BusinessRelations({ 
    specificBusinessInfo,
    specificUserInfo,
    selectedBusinessId
}) {
    const [selectedCategory, setSelectedCategory] = useState("Photos");

    const availableCategories = ["Photos", "Review", "Business Info"];

    // Get user's review of business
    const userReviews = specificUserInfo.business_reviews;
    const specificReview = userReviews.filter(review => review.business_id === selectedBusinessId)[0];

    const renderedRelationContainer = specificBusinessInfo ? 
        <div id="visitedPrefectureInfoGrid">
            {availableCategories.map((category, index) => (
                <button 
                    key={index}
                    id="visitedBusinessOptionsButtons"
                    className={selectedCategory === category ? "chosenCategoryButton" : null}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
        :
        null;
    
    return (
        <div id="visitedBusinessRelationContainer">
            {renderedRelationContainer}
            {selectedCategory === "Review" && (
                <BusinessReview 
                    specificReview={specificReview}
                    specificUserInfo={specificUserInfo}
                />
            )}
            {selectedCategory === "Business Info" && (
                <BusinessInfoRelation 
                    businessInfo = {specificBusinessInfo.business}
                />
            )}
        </div>
    );
}

export default BusinessRelations;