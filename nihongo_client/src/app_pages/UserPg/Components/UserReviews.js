import { useState } from "react"
import "./UserReviews.css"

function UserReviews({ userReviews }) {
    const reviewPerPg = 4 
    const [currentPg, setCurrentPg] = useState(0)

    const numberReviews = userReviews.length

    // Sort the reviews by date, newest first
    const sortedReviews = userReviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date))

    // Calculate the start and end index for the current page
    const startIndex = currentPg * reviewPerPg
    const endIndex = startIndex + reviewPerPg

    // Slice the sorted reviews to get only the reviews for the current page
    const renderReviews = sortedReviews.slice(startIndex, endIndex)

    // Map over the sliced reviews to render them
    const renderUserReviews = renderReviews.map((reviewInfo, index) => (
        <div 
            key={index}
            id="reviewGrid"
        >
            <div id="specificBusinessReviewImgContainer">
                <img 
                    id="businessReviewImg"
                    src={reviewInfo.business.profile_picture?.length > 0 ?
                        reviewInfo.business.profile_picture[0]?.picture_route
                        :
                        "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    }
                />
            </div>

            <div id="businessReviewBlock">
                <h3 id="businessReviewName">
                    {reviewInfo.business.name}
                </h3>

                <h5 id="businessReviewRating">
                    {reviewInfo.review_rating} ⭐️
                </h5>

                <h4 id="businessReviewComment">
                    {reviewInfo.review_comment}
                </h4>

                <h6 id="businessReviewDate">
                    {reviewInfo.review_date}
                </h6>
            </div>
        </div>
    ))

    return (
        <>
            {renderUserReviews}

            <div>
                {
                    numberReviews > reviewPerPg && (
                        <div
                            id="reviewButtonOptions"
                        >
                            {currentPg > 0 && (
                                <button
                                    onClick={() => setCurrentPg(currentPg - 1)}
                                    className="reviewButtons"
                                >
                                    Previous Reviews 
                                </button>
                            )}
                            {endIndex < numberReviews && (
                                <button
                                    onClick={() => setCurrentPg(currentPg + 1)}
                                    className="reviewButtons"
                                >
                                    More Reviews
                                </button>
                            )}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default UserReviews
