import "./BusinessIntroAvReview.css"

function BusinessIntroAvReview({
    averageReview,
    reviewNumbers
}){
    return(
        <div id="businessAvReviewContainer">
            <h1 id="averageRatingTitle">Average Rating</h1>
            <div id="averageReviewGrid">
                <h3>{averageReview} ⭐️ from {reviewNumbers} Reviews</h3>
            </div>
        </div>
    )
}
export default BusinessIntroAvReview