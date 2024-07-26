import { useState } from "react"
import "./BusinessFeed.css"

import BusinessReviews from "./BusinessReviews"

function BusinessFeed({
    currentBusinessReviews,
    loggedUser,
    specificBusinessId
}){
    const [selectedCategory, setSelectedCategory] = useState("Blogs")

    const businessFeedCategory = ["Blogs", "Check-Ins", "Pictures", "Reviews"]

    const renderButtons = businessFeedCategory.map((category, index) => (
        <button 
            key={index} 
            id="businessButtons"
            className={selectedCategory === category ? "selectedBusinessCategory" : null}
            onClick={() => setSelectedCategory(category)}
        >
            {category}
        </button>
    ))

    return(
        <div id="businessFeedContainer">
            <div id="businessButtonsGrid">
                {renderButtons}
            </div>
            
            <div id="renderedBusinessChoice">
                {selectedCategory === "Reviews" ? 
                    <BusinessReviews 
                        currentBusinessReviews={currentBusinessReviews}
                        loggedUser={loggedUser}
                        specificBusinessId={specificBusinessId}
                    />
                    :
                    null
                }
            </div>
        </div>
    )
}
export default BusinessFeed