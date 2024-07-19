import { useEffect, useState } from "react"

import "./PrefectureReviews.css"
import ReviewProgress from "./ReviewProgress"


function PrefectureReviews({
    specificPrefecture,
    loggedUser
}){

    const [prefectureCategories, setPrefectureCategories] = useState([])
    const [page, setPage] = useState(0)
    const [reviewing, setReviewing] = useState(false)

    //Get all prefecture categories
    useEffect(() => {
        fetch('/prefecturecategories')
        .then(r => {
            if(r.ok) {
                return r.json()
            }
            throw r
        })
        .then(categories => setPrefectureCategories(categories))
    }, [])

    //Create a copy of the prefecture
    const prefectureCopy = {...specificPrefecture}
    
    const prefectureReviewsArray = prefectureCopy.prefecture_reviews

    //Copy prefectureCategories
    const copyPrefectureCategories = [...prefectureCategories]
    //Add a new column to prefectureCategories
    copyPrefectureCategories.forEach(categoryInfo => {
        // Filter reviews that match the current category
        const relevantReviews = prefectureReviewsArray.filter(reviewInfo => reviewInfo.review_category.category === categoryInfo.category);
    
        // Calculate average rating
        if (relevantReviews.length > 0) {
            const totalRating = relevantReviews.reduce((accumulator, review) => accumulator + review.rating, 0);
            categoryInfo.averageRating = totalRating / relevantReviews.length;
        } else {
            categoryInfo.averageRating = 0; // or any default value if no reviews found
        }
    });

    const orderedRatings = copyPrefectureCategories.sort((a, b) => b.averageRating - a.averageRating);

    //make it so only 3 categories are shown per page
    const numberOnPg = 3

    const numberOfCategories = prefectureCategories.length

    const increasePage = () => {
        setPage(page + numberOnPg + 1)
    }


    const decreasePage = () => {
        setPage(page - numberOnPg - 1)
    }

    const renderedNumber = orderedRatings.slice(page, page + numberOnPg)

    const renderRatings = renderedNumber.map((ratings, index) => (
        <div key={index} id="ratingsContainer">
            <div id="ratingGrid">
                <h5>{ratings.category}</h5>
                <h5>{ratings.averageRating} 🔴</h5>
            </div>
        </div>
    ))

    return(
        reviewing ? 
            <ReviewProgress 
                prefectureCategories={prefectureCategories}
                setReviewing={setReviewing}
                loggedUser={loggedUser}
                specificPrefecture={specificPrefecture}
            />
            :
            <div>
                {renderRatings}
                <div id="reviewButtonsContainer">
                    {page == 0 ? 
                        null
                        :
                        <button 
                            onClick={decreasePage}
                            className="ratingButtons"
                        >
                            Previous
                        </button>
                    }

                    {page + numberOnPg < numberOfCategories ?
                        <button 
                            onClick={increasePage}
                            className="ratingButtons"
                        >
                            More
                        </button>
                        :
                        null
                    }
                </div>

                {loggedUser.role == "Admin" || loggedUser.role == "Citizen" || loggedUser.role == "Traveller" ?
                    <button 
                        id="reviewPrefectureButton"
                        onClick={() => setReviewing(!reviewing)}
                    >
                        Create Review
                    </button>
                    :
                    null
                }
            
            </div>
    )
  
}
export default PrefectureReviews