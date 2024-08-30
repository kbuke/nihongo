import "./Review.css"

import deleteIcon from "../../../assets/binIcon.png"
import editIcon from "../../../assets/editIcon.png"

import { Link } from "react-router-dom"
import { useState } from "react"


function Reviews({
    allBusinessReviews,
    specificBusinessId,
    loggedUserId,
    setDeleteReview,
    setReviewId,
    setEditReview,
    setCurrentBusinessReview,
    setCurrentBusinessReviewComment
}){
    const [pgNumber, setPgNumber] = useState(0)

    

    const filterReviews = allBusinessReviews.filter(business => business.business_id === specificBusinessId)
    console.log(filterReviews)

    const hanldeDeleteLogic = (newId) => {
        setReviewId(newId)
        setDeleteReview(true)
    }

    const handleEditLogic = (newId, rating, comment) => {
        setReviewId(newId)
        setEditReview(true)
        setCurrentBusinessReview(rating)
        setCurrentBusinessReviewComment(comment)
    }

    console.log(filterReviews)

    const sortReviews = filterReviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date))
    console.log(sortReviews)

    const numberPgReviews = 4

    const numberOfReviews = sortReviews.length
    console.log(`there have been ${numberOfReviews} reviews`)

    const sliceReviews = sortReviews.slice(pgNumber, numberPgReviews + pgNumber)


    const renderReviews = sliceReviews.map((business, index) => (
        <div
            key={index}
            id="businessReviewGrid"
        >
            <Link 
                id="renderedCheckInImgContainer"
                to={`/users/${business.user_id}`}
            >
                <img 
                    id="renderedCheckInImg"
                    src={business.user.profile_picture?.picture_route}
                />
            </Link>

            <div id="businessReviewBlock">
                <h3
                    id="userReviewTitle"
                >
                    {business.user.username} 
                </h3>

                <h3
                    id="userReviewRating"
                >
                    {business.review_rating} ⭐️'s
                </h3>

                <h4
                    id="userReviewComment"
                >
                    {business.review_comment}
                </h4>


                <h6
                    id="reviewDate"
                >
                    {business.review_date}
                </h6>
            </div>

            <div>
                {loggedUserId === business.user_id ?
                    <>
                        <div 
                            id="deleteCommentIconContainer"
                            onClick={() => hanldeDeleteLogic(business.id)}
                        >
                            <img 
                                id="deleteCommentIcon"
                                src={deleteIcon}
                            />
                        </div>

                        <div
                            id="editCommentIconContainer"
                            onClick={() => handleEditLogic(
                                business.id, 
                                business.review_rating,
                                business.review_comment
                            )}
                        >
                            <img 
                                id="editCommentIcon"
                                src={editIcon}
                            />
                        </div>
                    </>
                    :
                    null
                }
            </div>
        </div>
    ))
    console.log(`Current pg number is ${pgNumber}`)
    return(
        <>
            {renderReviews}

            {numberOfReviews < numberPgReviews ?
                null
                :
                <div
                    id="reviewButtonContainer"
                >
                    {numberOfReviews > pgNumber + 1 ?
                        <button
                            onClick={() => setPgNumber(pgNumber + 5)}
                        >
                            Show More Reviews
                        </button>
                        :
                        null
                    }

                    {numberOfReviews <= pgNumber + 1 ?
                        <button
                            onClick={() => setPgNumber(pgNumber-5)}
                        >
                            Show More Recent Reviews
                        </button>
                        :
                        null
                    }
                </div>
            }
        </>
    )
}
export default Reviews