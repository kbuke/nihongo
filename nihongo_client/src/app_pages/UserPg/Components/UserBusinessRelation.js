import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import "./UserBusinessRelation.css"

function UserBusinessRelation({
    selectedBusinessId,
    specificUserInfo,
    appData
}){
    console.log(specificUserInfo)
    const [selectedOption, setSelectedOption] = useState("About")
    const [filterPictures, setFilterPictures] = useState()
    //Render the options in container
    const availableOptions = ["About", "Relation"]
    const renderAvailableOptions = availableOptions.map((option, index) => (
        <h1 
            key={index}
            onClick={() => setSelectedOption(option)}
            className="possibleSelection"
            id={selectedOption === option ? "selectedPossibleSelection" : null}
        >
            {option}
        </h1>
    ))

    //Get all pictures
    const allPictures = appData.allPictures
    console.log(allPictures)
    useEffect(() => (
        setFilterPictures(allPictures.filter(picture => picture.user_id === specificUserInfo.id && picture.business_id === selectedBusinessId))
    ), [allPictures, selectedBusinessId])
    console.log(filterPictures)
    const sortPictures = filterPictures?
        filterPictures.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date))
        :
        null

    const renderPictures = sortPictures? sortPictures.map((pictures, index) => (
        <div 
            key={index}
            className="pictureFeedContainer"
        >
            <img 
                className="pictureFeedImg"
                src={pictures.picture_route? pictures.picture_route : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
            />
        </div>
    ))
    :
    null
    //Get all businesses
    const allBusinesses = appData.allBusinesses
    console.log(allBusinesses)
    const filterBusiness = allBusinesses.filter(business => business.id === selectedBusinessId)
    console.log(filterBusiness)

    //Get all business checkins
    const allCheckIns = appData.businessCheckIn
    console.log(allCheckIns)
    const filterBusinessCheckIn = allCheckIns.filter(business => business.business_id === selectedBusinessId && business.user_id === specificUserInfo.id)
    console.log(filterBusinessCheckIn)
    const businessCheckInDate = filterBusinessCheckIn[0].check_in_date

    //Get all business reviews
    const allReviews = appData.allBusinessReviews
    console.log(allReviews)
    const filterReviews = allReviews.filter(review => review.user_id === specificUserInfo.id && review.business_id === selectedBusinessId)
    console.log(filterReviews)
    const reviewRating = filterReviews[0]?.review_rating ? filterReviews[0].review_rating : <h2>No Review</h2>
    const reviewComment = filterReviews[0]?.review_comment ? filterReviews[0].review_comment : <h2>No Review</h2>
    //Get info to display for business
    const businessCoverPhoto = filterBusiness[0].cover_photo
    const businessName = filterBusiness[0].name 
    const businessInfo = filterBusiness[0].user_info
    //Get business types
    const businessTypes = filterBusiness[0].business_types
    console.log(businessTypes)
    const renderBusinessTypes = businessTypes.map((type, index) => (
        <div 
            key={index}
            id="businessTypeContainer"
        >
            <h3 id="businessType">
                {type.registered_type.business_type}
            </h3>
        </div>
    ))
    //Handle  general review logic
    const businessReviews = filterBusiness[0].business_reviews
    const numberOfReviews = businessReviews.length
    const totalScore = businessReviews.reduce((accumulator, business) => (
        accumulator + business.review_rating
    ), 0)
    const averageReview = (totalScore/numberOfReviews).toFixed(1)
    console.log(filterBusiness)
    const businessPicture = filterBusiness[0].profile_picture?.picture_route
    
    //Handle user logic
    const userProfilePicture = specificUserInfo.profile_picture[0]?.picture_route? specificUserInfo.profile_picture[0].picture_route : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    const userName = specificUserInfo.username

    return(
        <div>
            <div
                id="specificBusinessUserContainer"
            >
                <div
                    id="specificBusinessUserBackground"
                    style={{
                        backgroundImage: `url(${businessCoverPhoto})`
                    }}
                >
                    {selectedOption === "About" ? 
                        <div id="specificBusinessUserInfoContainer">
                            <Link
                                id="specificBusinessUserPicContainer"
                                to={`/business/${selectedBusinessId}`}
                            >
                                <img 
                                    id="specificBusinessUserPic"
                                    src={businessPicture}
                                />
                            </Link>

                            <h1 id="specificBusinessUserName">{businessName}</h1>

                            <div id="renderSpecificBusinessOptionsGrid">
                                {renderAvailableOptions}
                            </div>

                            <div id="renderSpecificBusinessTypeGrid">
                                {renderBusinessTypes}
                            </div>

                            <h2 id="specificBusinessAverageRate">{averageReview} ⭐️</h2>
                            <h3 id="specificBusinessNumberReviews">({numberOfReviews} Reviews)</h3>

                            <h3 id="specificBusinessInfo">{businessInfo}</h3>
                        </div>
                        :
                        <div id="extendedBusinessRelationContainer">
                            <div id="extendedBusinessRelationImgGrid">
                                <img 
                                    id="specificUserBusinessImg"
                                    src={userProfilePicture}
                                />
                                <img 
                                    id="specificBusinessUserImg"
                                    src={businessPicture}
                                />
                            </div>

                            <h2 id="userBusinessSpecificName">
                                {userName} & {businessName}
                            </h2>

                            <div id="renderSpecificBusinessOptionsGrid">
                                {renderAvailableOptions}
                            </div>

                            <div id="specificInfoContainer">
                                <div id="specificCheckInGrid">
                                    <h2 id="checkInTitle">Checked In:</h2>
                                    <h2 id="checkInDate">{businessCheckInDate}</h2>
                                </div>
                            </div>

                            <div id="specificInfoContainer">
                                <div id="specificCheckInGrid">
                                    <h2 id="checkInTitle">Rating:</h2>
                                    <h2 id="checkInDate">{reviewRating} ⭐️</h2>
                                </div>
                            </div>

                            <div id="specificInfoContainer">
                                <div id="specificCheckInGrid">
                                    <h2 id="checkInTitle">Review Comment:</h2>
                                    <h2 id="checkInDate">{reviewComment}</h2>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div
                id="renderedUserPictureGrid"
            >
                {renderPictures}
            </div>
        </div>
    )
    
}
export default UserBusinessRelation