import "./BusinessInfoRelation.css"

import { Link } from "react-router-dom"

function BusinessInfoRelation({
    businessInfo
}){
    console.log(businessInfo)
    //Find average review score
    const sumReview = businessInfo.business_reviews.reduce((accumulator, review) => {
        return (accumulator + review.review_rating)
    }, 0)
    
    const numberOfReviews = businessInfo.business_reviews.length

    const averageReview = (sumReview / numberOfReviews).toFixed(1)
    
    return(
        <div 
            id="visitedBusinessInfoContainer"
        >
            <Link 
                id="visitedBusinessInfoImgContainer"
                to={`/business/${businessInfo.id}`}
            >
                <img 
                    id="visitedBusinessInfoImg"
                    src={businessInfo.profile_picture}
                />
            </Link>

            <div 
                id="visitedBusinessInfoBlock"
            >
                <h1 id="visitedBusinessTitle">{businessInfo.name}</h1>
                <h2 id="visitedBusinessAvScore">{averageReview} ⭐️ ({numberOfReviews} Reviews)</h2>
                <h3 id="visitedBusinessInfo">{businessInfo.user_info}</h3>
            </div>
        </div>
    )
}
export default BusinessInfoRelation