import { useState } from "react"
import "./BusinessIntro.css"

import AboutBusiness from "./AboutBusiness"
import BusinessCheckIns from "./BusinessCheckIns"
import BusinessWishList from "./BusinessWishList"
import Reviews from "./Reviews"
import ViewProfilePic from "./ViewProfilePic"
import EditBusinessInfo from "./EditBusinessInfo"
import UpdateBusinessTypes from "./UpdateBusinessTypes"

import emailIcon from "../../../assets/email_icon.png"
import clockIcon from "../../../assets/clock_icon.png"
import locationIcon from "../../../assets/unvisitedMark.png"
import visitedIcon from "../../../assets/visitedMark.png"
import phoneIcon from "../../../assets/phone_icon.png"
import noWishListIcon from "../../../assets/emptyTravelBag.png"
import wishListIcon from "../../../assets/fullTravelBag.png"


function BusinessIntro({
    // businessCoverPhoto,
    businessesCoverPhoto,
    setBusinessesCoverPhoto,
    businessPicture,
    businessName,
    // businessInfo,
    businessesBio,
    setBusinessesBio,
    specificBusiness,
    allCheckIns,
    loggedUserId,
    businessCheckIn,
    setBusinessCheckIn,
    allWishLists,
    setAllWishLists,
    allBusinessReviews,
    setDeleteReview,
    setReviewId,
    setNewReview,
    setAllBusinesses,
    allBusinesses,
    businessPictureInfo,
    setEditReview,
    setCurrentBusinessReview,
    setCurrentBusinessReviewComment,
    loggedUserRole,
    appData
}){


    const[chosenOption, setChosenOption] = useState("Intro")
    const[viewProfilePicture, setViewProfilePicture] = useState(false)
    const[updatingBusinessInfo, setUpdatingBusinessInfo] = useState(false)
    const[updateBusinessTypes, setUpdateBusinessTypes] = useState(false)
   

    const availableOptions = ["Intro", "About", "Check-Ins", "WishLists", "Reviews"]

    const renderOptions = availableOptions.map((option, index) => (
        <button
            key={index}
            className="businessIntroButtonOption"
            onClick={() => setChosenOption(option)}
            id={option === chosenOption ? "chosenBusinessIntroOption" : null}
        >
            {option}
        </button>
    ))


    //get the information for each business such as address, email etc
    const emailAddress = specificBusiness?.email
    const phoneNumber = specificBusiness?.contact_number

    //get address (building number, neighourhood, city, prefecture, postal code)
    const buildingNumbers = specificBusiness?.building_numbers
    const neighbourhood = specificBusiness?.neighbourhood
    const city = specificBusiness?.city 
    const prefecture = specificBusiness?.prefecture?.prefecture_name
    const postCode = specificBusiness?.postal_code
    const businessAddress = `${buildingNumbers}, ${neighbourhood}, ${city}, ${prefecture}, ${postCode}`

    //get opening and closing times
    const openingTime = specificBusiness?.opening_time
    const closingTime = specificBusiness?.closing_time 
    const operatingHours = `${openingTime} - ${closingTime}`

    //Create decorator for displaying business info
    const businessInfoGrid = (icon, info) => {
        return(
            <div id="businessInfoGrid">
                <div id="businessInfoIconContainer">
                    <img 
                        id="businessInfoIcon"
                        src={icon}
                    />
                </div>
                <h3 id="businessInfoText">
                    {info}
                </h3>
            </div>
        )
    }

    //Filter to see if user has check in 
    const filterCheckIn = businessCheckIn.filter(business => business.business_id === specificBusiness?.id && business.user_id === loggedUserId)


    //Filter to see if the user has the business in their wishlist
    const filterWishList = allWishLists.filter(business => business.business_id === specificBusiness?.id && business.user_id === loggedUserId)
   

    //Handle push and delete requests for check ins and wishlists
    const checkInUrl = "/businesscheckin"
    const wishListUrl = '/businesswishlist'

    const specificBusinessId = specificBusiness?.id

    const handlePush = (e, fetchUrl, setAllCategories, allCategories) => {
        e.preventDefault()
        const jsonData = {
            loggedUserId,
            specificBusinessId
        }
        fetch(fetchUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newCategory => setAllCategories([...allCategories, newCategory]))
    }

    const handleDelete = (e, specificUrl, setAllCategories, categoryId) => {
        e.preventDefault()
        fetch(specificUrl, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllCategories(categories => categories.filter(category => category.id !== categoryId))
                }
            })
    }

    //calculate the average score of each business
    const totalScore = specificBusiness?.business_reviews? 
        specificBusiness.business_reviews.reduce((accumulator, business) => (
            accumulator + business.review_rating
        ), 0)
        :
        null
    
    const numberReviews = specificBusiness?.business_reviews.length
    
    const averageReview = (totalScore / numberReviews).toFixed(1)

    console.log(allBusinessReviews)
    const filterReviews = allBusinessReviews.filter(business => business.user_id === loggedUserId && business.business_id === specificBusinessId)
    console.log(chosenOption)
    



    return(
        <div 
            id="businessIntroContainer"
            style={{
                backgroundImage: `url(${businessesCoverPhoto})`,
            }}
        >
            <div 
                className="businessIntroCover"
                id={
                    chosenOption!=="Intro"?
                        "expandBusinessIntroCover"
                        :
                        null
                }
            >
                <div id="businessIntroHome">
                    <div 
                        id="specificBusinessImgContainer"
                        onClick={() => setViewProfilePicture(true)}
                    >
                        <img
                            id="specificBusinessImg"
                            src={businessPicture}
                        />
                    </div>

                    <h1 id="specificBusinessName">{businessName}</h1>

                    <div id="businessOptionsRenderedGrid">
                        {renderOptions}
                    </div>

                    {chosenOption === "Intro" ? 
                        <div 
                            id="specificBusinessIntroInfoContainer"
                        >
                            <h4 id="specificBusinessIntroInfo">{businessesBio}</h4>
                            {loggedUserId === specificBusinessId ? 
                                <>
                                    <div 
                                        id="updateBusinessInfoButton"
                                        onClick={() => setUpdatingBusinessInfo(true)}    
                                    >
                                        <h4 id="updateBusinessInfoButtonText">Update {specificBusiness?.name}'s Info</h4>
                                    </div>

                                    <div
                                        id="updateBusinessCategoriesInfo"
                                        onClick={() => setUpdateBusinessTypes(true)}
                                    >
                                        <h4
                                            id="updateBusinessInfoButtonText"
                                        >
                                            Update {specificBusiness?.name}'s Business Categories
                                        </h4>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                        :
                        null 
                    }

                    {chosenOption === "About" ? 
                        <div>
                            <>
                                {businessInfoGrid(phoneIcon, phoneNumber)}
                                {businessInfoGrid(emailIcon, emailAddress)}
                                {businessInfoGrid(clockIcon, operatingHours)}
                                {businessInfoGrid(locationIcon, businessAddress)}
                            </>

                     
                        </div>
                        :
                        null
                    }

                    {/* Sort Check Ins */}
                    {chosenOption === "Check-Ins" ? (
                        loggedUserRole !== "Local Business" ? (
                            filterCheckIn.length > 0 ? (
                                <div id="checkInBlock">
                                    <h3 id="specificBusinessInfoText">You have visited {specificBusiness.name}</h3>
                                    <div
                                        id="checkInImgButton"
                                        onClick={(e) => handleDelete(e, `/businesscheckin/${filterCheckIn[0].id}`, setBusinessCheckIn, filterCheckIn[0].id)}
                                    >
                                        <img 
                                            id="checkInImg"
                                            src={visitedIcon}
                                        />
                                    </div>
                                    <h3 id="specificBusinessInfoText">Click to check-out</h3>
                                </div>
                            ) : (
                                <div 
                                    id="checkInBlock"
                                    onClick={(e) => handlePush(e, checkInUrl, setBusinessCheckIn, allCheckIns)}
                                >
                                    <h3>You have not visited {specificBusiness.name}</h3>
                                    <div id="checkInImgButton">
                                        <img
                                            id="checkInImg"
                                            src={locationIcon}
                                        />
                                    </div>
                                    <h3>Please click the icon above to mark visited</h3>
                                </div>
                            )
                        ) 
                        :
                        <h2>As a business you can not add places to your checkins</h2>
                    ): 
                    null
                    }

                    {/*Sort the reviews*/}
                    {chosenOption === "Reviews" ? (
                        numberReviews === 0 && filterCheckIn.length > 0 ? (
                            <>
                                <h3>No Reviews yet for {specificBusiness.name}</h3>
                                <button
                                    onClick={() => setNewReview(true)}
                                >
                                    Leave a Review
                                </button>
                            </>
                        ) : (
                            <div>
                                <h2>{averageReview} ⭐️'s</h2>
                                <h3>From {numberReviews} Reviews</h3>

                                {filterCheckIn.length > 0 ? (
                                    filterReviews.length === 0 ? (
                                        <button
                                            onClick={() => setNewReview(true)}
                                        >
                                            Write a Review
                                        </button>
                                    ) : (
                                        <h3>You have already reviewed</h3>
                                    )
                                ) : (
                                    <h3>You must check in to leave a review</h3>
                                )}
                            </div>
                        )
                    ) : null}


                    {/*Sort Wish List */}
                    {chosenOption === "WishLists" ? (
                        loggedUserRole !== "Local Business" ? (
                            filterWishList.length > 0 ? (
                                <div 
                                    id="checkInBlock"
                                    onClick={(e) => handleDelete(e, `/businesswishlist/${filterWishList[0].id}`, setAllWishLists, filterWishList[0].id)}
                                >
                                    <h3>{specificBusiness.name} is in your Wishlist</h3>
                                    <div
                                        id="checkInImgButton"
                                    >
                                        <img 
                                            id="checkInImg"
                                            src={wishListIcon}
                                        />
                                    </div>
                                    <h3>Click to remove it from wishlist</h3>
                                </div>
                            )   
                            :
                            <div 
                                id="checkInBlock"
                                onClick={(e) => handlePush(e, wishListUrl, setAllWishLists, allWishLists)}
                            >
                                <h3>{specificBusiness.name} is not in your Wishlist</h3>
                                <div 
                                    id="checkInImgButton"
                                >
                                    <img 
                                        id="checkInImg"
                                        src={noWishListIcon}
                                    />
                                </div>
                                <h3>Click the bag to add it to your wishlist</h3>
                            </div>
                        )
                        : 
                        <h2>As a business you can not add places to your wishlist</h2>
                    )
                    :
                    null}

              
                </div>
                    {chosenOption === "About" ? 
                        <AboutBusiness 
                            specificBusiness={specificBusiness}
                        />
                        :
                        null
                    }

                    {chosenOption === "Check-Ins" && (
                        <div style={{ gridArea: "checkInsContent" }}>
                            <BusinessCheckIns 
                                businessCheckIn={businessCheckIn}
                                specificBusinessId={specificBusinessId}
                                businessName={businessName}
                            />
                        </div>
                    )}

                    {chosenOption === "WishLists" && (
                        <div style={{gridArea: "checkInsContent"}}>
                            <BusinessWishList 
                                allWishLists={allWishLists}
                                specificBusinessId={specificBusinessId}
                                businessName={businessName}
                            />
                        </div>
                    )}

                    {chosenOption === "Reviews" && (
                        <div style={{gridArea: "checkInsContent"}}>
                            <Reviews 
                                allBusinessReviews={allBusinessReviews}
                                specificBusinessId={specificBusinessId}
                                businessName={businessName}
                                loggedUserId={loggedUserId}
                                setDeleteReview={setDeleteReview}
                                setReviewId={setReviewId}
                                setEditReview={setEditReview}
                                setCurrentBusinessReview={setCurrentBusinessReview}
                                setCurrentBusinessReviewComment={setCurrentBusinessReviewComment}
                            />
                        </div>
                    )}

            </div>

            {viewProfilePicture ?
                <ViewProfilePic 
                    profilePic={businessPicture}
                    setViewProfilePicture={setViewProfilePicture}
                    loggedUserId={loggedUserId}
                    businessPicture={businessPicture}
                    businessPictureInfo={businessPictureInfo}
                />
                :
                null
            }

            {updatingBusinessInfo ?
                <EditBusinessInfo 
                    setUpdatingBusinessInfo={setUpdatingBusinessInfo}
                    specificBusinessId={specificBusinessId}
                    businessName={businessName}
                    businessesBio={businessesBio}
                    setBusinessesBio={setBusinessesBio}
                    businessesCoverPhoto={businessesCoverPhoto}
                    setBusinessesCoverPhoto={setBusinessesCoverPhoto}
                    allBusinesses={allBusinesses}
                    setAllBusinesses={setAllBusinesses}
                />
                :
                null 
            }

            {updateBusinessTypes ?
                <UpdateBusinessTypes 
                    appData={appData}
                    specificBusinessId={specificBusinessId}
                    setUpdateBusinessTypes={setUpdateBusinessTypes}
                />
                :
                null
            }
        </div>
    )
}
export default BusinessIntro

