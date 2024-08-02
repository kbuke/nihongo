import "./BusinessIntroAvReview.css"

function BusinessIntroAvReview({
    specificBusinessId,
    allBusinessReviews
}){

    const filterReviews = allBusinessReviews.filter(reviewInfo => reviewInfo.business_id === specificBusinessId)

    const numberOfReviews = filterReviews.length 
    const totalScore = filterReviews.reduce((accumulator, reviews) => {
        return accumulator + reviews.review_rating
    }, 0)

    const averageScore = totalScore/numberOfReviews

    const roundedAverageScore = averageScore.toFixed(1)

    return(
        <div id="businessAvReviewContainer">
            <h1 id="averageRatingTitle">Average Rating</h1>
            <div id="averageReviewGrid">
                <h3>{roundedAverageScore} ⭐️ from {numberOfReviews} Reviews</h3>
            </div>
        </div>
    )
}
export default BusinessIntroAvReview