import { useState } from "react"
import "./BusinessFeed.css"

import BusinessReviews from "./BusinessReviews"
import BusinessPictures from "./BusinessPictures"

function BusinessFeed({
    loggedUser,
    specificBusinessId,
    allCheckIns,
    allBusinessReviews,
    setAllBusinessReviews
}){
    const [selectedCategory, setSelectedCategory] = useState("Pictures")

    const businessFeedCategory = ["Pictures", "Reviews", "Check-Ins", "Blogs"]

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
                        loggedUser={loggedUser}
                        specificBusinessId={specificBusinessId}
                        allCheckIns={allCheckIns}
                        allBusinessReviews={allBusinessReviews}
                        setAllBusinessReviews={setAllBusinessReviews}
                    />
                    :
                    null
                }

                {selectedCategory === "Pictures" ?
                    <BusinessPictures 
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