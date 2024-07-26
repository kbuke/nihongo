import { useEffect, useState } from "react";
import "./BusinessReviews.css";
import binIcon from "../../../assets/binIcon.png";
import editIcon from "../../../assets/editIcon.png";
import ReviewModal from "./ReviewModal"; // Import the modal component

function BusinessReviews({
    currentBusinessReviews,
    loggedUser,
    specificBusinessId
}) {
    const [allBusinessReviews, setAllBusinessReviews] = useState([]);
    const [writingReview, setWritingReview] = useState(false); // State for modal visibility

    const usersBusinessCheckIns = loggedUser.business_visit;
    const filterCheckIns = usersBusinessCheckIns.filter(business => business.business_id === specificBusinessId);

    const userReviews = loggedUser.business_reviews;
    const filterReviews = userReviews.filter(reviews => reviews.business_id === specificBusinessId);
    console.log(filterReviews); 

    // Get all business reviews
    useEffect(() => {
        fetch("/businessreviews")
            .then(r => {
                if (r.ok) {
                    return r.json();
                }
                throw r;
            })
            .then(reviews => setAllBusinessReviews(reviews));
    }, []);
    console.log(allBusinessReviews);

    const handleDeleteReview = (e, reviewId) => {
        e.preventDefault();
        fetch(`/businessreviews/${reviewId}`, {
            method: "DELETE"
        })
            .then(r => {
                if (r.ok) {
                    setAllBusinessReviews(reviews => reviews.filter(review => review.id !== reviewId));
                }
            });
    };

    const handleSubmitReview = (review) => {
        fetch("/businessreviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...review,
                user_id: loggedUser.id,
                business_id: specificBusinessId,
            })
        })
            .then(r => r.json())
            .then(newReview => {
                setAllBusinessReviews([...allBusinessReviews, newReview]);
                setWritingReview(false);
            });
    };

    const reviewDates = currentBusinessReviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));

    const renderReviews = reviewDates.map((reviewInfo, index) => (
        <div key={index} id="userReviewContainer">
            <div id="userReviewImgContainer">
                <img id="userReviewImg" src={reviewInfo.user.profile_picture} />
            </div>

            <div id="reviewInfoBlock">
                <h1>{reviewInfo.review_rating} ⭐️</h1>
                <h3>{reviewInfo.review_comment}</h3>
                <h4>{reviewInfo.review_date}</h4>
            </div>

            <div id="reviewEditGrid">
                {reviewInfo.user.id === loggedUser.id ? (
                    <>
                        <div className="reviewIconContainer">
                            <img className="reviewIcon" src={binIcon} onClick={(e) => handleDeleteReview(e, reviewInfo.id)} />
                        </div>
                        <div className="reviewIconContainer">
                            <img className="reviewIcon" src={editIcon} />
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    ));

    console.log(filterCheckIns);
    console.log(filterReviews);

    const createReview = filterCheckIns.length === 0 || filterReviews.length !== 0 ? (
        <div id="noReviewContainer">
            <h2>You have either not visited, or have left a review</h2>
        </div>
    ) : (
        <button id="createReviewButton" onClick={() => setWritingReview(true)}>
            Write Review
        </button>
    );

    return (
        <div id="reviewContainer">
            {createReview}
            {renderReviews}
            <ReviewModal show={writingReview} onClose={() => setWritingReview(false)} onSubmit={handleSubmitReview} />
        </div>
    );
}

export default BusinessReviews;