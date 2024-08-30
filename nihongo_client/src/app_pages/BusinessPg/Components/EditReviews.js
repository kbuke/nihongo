import "./EditReviews.css"

function EditReviews({
    setEditReview,
    reviewId,
    allBusinessReviews,
    setAllBusinessReviews,
    setCurrentBusinessReview,
    currentBusinessReview,
    currentBusinessReviewComment,
    setCurrentBusinessReviewComment
}){
    console.log(`current rating is ${currentBusinessReview}`)
    console.log(currentBusinessReviewComment)
    const availableRank = [1, 2, 3, 4, 5]

    const renderRanks = availableRank.map((rating, index) => (
        <option
            key={index}
        >
            {rating}
        </option>
    ))

    const handlePatch = (e) => {
        e.preventDefault()
        fetch(`/businessreviews/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                review_rating: currentBusinessReview,
                review_comment: currentBusinessReviewComment
            })
        })
        .then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update review")
                return null 
            }
        })
        .then((newReviewInfo) => {
            if(newReviewInfo) {
                setAllBusinessReviews(allBusinessReviews.map(oldBusinessReviews => 
                    oldBusinessReviews.id === newReviewInfo.id ? newReviewInfo : oldBusinessReviews
                ))
            }
        })
        .then(() => setEditReview(false))
    }
    return(
        <div
            id="editReviewModal"
        >
            <h1
                style={{
                    textAlign: "center",
                    fontWeight: "200",
                    textDecoration: "underline"
                }}
            >
                Edit Review

                <div
                    id="editReviewForm"
                >
                    <div
                        className="editReviewInfoGrid"
                    >
                        <h4
                            style={{
                                fontWeight: "200",
                                textDecoration: "none",
                                fontSize: "80%"
                            }}
                        >
                            Enter New Rating
                        </h4>

                        <select 
                            id="availableRankBox"
                            value={currentBusinessReview}
                            onChange={(e) => setCurrentBusinessReview(Number(e.target.value))}
                        >
                            {renderRanks}
                        </select>
                    </div>
                    
                    <div
                        className="editReviewInfoGrid"
                    >
                        <h4
                            style={{
                                fontWeight: "200",
                                textDecoration: "none",
                                fontSize: "80%"
                            }}
                        >
                            Alter Review Comment
                        </h4>

                        <textarea
                            defaultValue={currentBusinessReviewComment}
                            onChange={(e) => setCurrentBusinessReviewComment(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            onClick={handlePatch}
                        >
                            Make Changes
                        </button>

                        <button
                            onClick={() => setEditReview(false)}
                        >
                            Cancel Change
                        </button>
                    </div>
                </div>
            </h1>
        </div>
    )
}
export default EditReviews