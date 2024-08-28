import "./ConfirmReviewDeletion.css"

function ConfirmReviewDeletion({
    setDeleteReview,
    reviewId,
    setAllBusinessReviews
}){
    const handleDeleteReview = (e) => {
        e.preventDefault()
        console.log("hi")
        fetch(`/businessreviews/${reviewId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllBusinessReviews(reviews => reviews.filter(review => review.id !== reviewId))
                }
            })
            .then(setDeleteReview(false))
    }

    return(
        <div className="deleteReviewModal">
            <div id="deleteForm">
                <h2>Delete Review</h2>
                <button onClick={handleDeleteReview}>Confirm Deletion</button>
                <button onClick={() => setDeleteReview(false)}>Cancel Deletion</button>
            </div>
        </div>
    )
}
export default ConfirmReviewDeletion