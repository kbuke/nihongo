import "./BusinessReview.css"
import { Link } from "react-router-dom"

function BusinessReview({
    specificReview,
    specificUserInfo
}){
    if (!specificReview) {
        return <div>Loading...</div>; // or any other fallback UI
    }

    const reviewerImg = specificUserInfo.profile_picture;
    const reviewRating = specificReview.review_rating;
    const reviewComment = specificReview.review_comment;
    const reviewDate = specificReview.review_date.slice(0, 10);
    const businessImg = specificReview.business?.profile_picture;

    return(
        <div id="reviewGrid">
            <img 
                id="reviewerImg"
                src={reviewerImg}
                alt="Reviewer"
            />

            <div id="reviewerBlock">
                <h1>{reviewRating ? `${reviewRating} ⭐️` : 'N/A'} </h1>
                <h2>{reviewComment}</h2>
                <h4>{reviewDate}</h4>
            </div>

            <Link 
                id="businessReviewImgContainer"
                to={`/business/${specificReview.business_id}`}
            >
                <img
                    id="businessReviewImg"
                    src={businessImg}
                    alt="Business"
                />
            </Link>
        </div>
    )
}

export default BusinessReview;
