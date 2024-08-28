import "./Review.css"

import deleteIcon from "../../../assets/binIcon.png"
import { useState } from "react"

import ConfirmReviewDeletion from "./ConfirmReviewDeletion"

function Reviews({
    allBusinessReviews,
    specificBusinessId,
    businessName,
    loggedUserId,
    setDeleteReview,
    setReviewId
}){

    const filterReviews = allBusinessReviews.filter(business => business.business_id === specificBusinessId)
    console.log(filterReviews)

    const hanldeDeleteLogic = (newId) => {
        setReviewId(newId)
        setDeleteReview(true)
    }

    const renderReviews = filterReviews.map((business, index) => (
        <div
            key={index}
            id="businessReviewGrid"
        >
            <div id="renderedCheckInImgContainer">
                {business.user.profile_picture.length === 0?
                    <img 
                        id="renderedCheckInImg"
                        src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    />
                    :
                    <img 
                        id="renderedCheckInImg"
                        src={business.user.profile_picture? business.user.profile_picture.picture_route : null}
                    />
                }
            </div>

            <div id="businessReviewBlock">
                <h3>{business.user.username} Rated {businessName} {business.review_rating} ⭐️'s</h3>
                <h4>{business.review_comment}</h4>
                <h6>{business.review_date}</h6>
            </div>

            <div>
                {loggedUserId === business.user_id ?
                    <div 
                        id="deleteCommentIconContainer"
                        onClick={() => hanldeDeleteLogic(business.id)}
                    >
                        <img 
                            id="deleteCommentIcon"
                            src={deleteIcon}
                        />
                    </div>
                    :
                    null
                }
            </div>
        </div>
    ))
    return(
        <>
            {renderReviews}
        </>
    )
}
export default Reviews