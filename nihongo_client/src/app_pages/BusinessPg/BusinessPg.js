import { useOutletContext, useParams } from "react-router-dom";
import "./BusinessPg.css";
import { useEffect, useState } from "react";

import BusinessPicture from "./Components/BusinessPicture";
import BusinessNameInfo from "./Components/BusinessNameInfo";
import BusinessIntroAvReview from "./Components/BusinessIntroAvReview";
import BusinessCheckInWishList from "./Components/BusinessCheckInWishList";
import BusinessInfoContainer from "./Components/BusinessInfoContainer";
import BusinessFeed from "./Components/BusinessFeed";

function BusinessPg() {
    const appData = useOutletContext();

    // Set up useParams
    const params = useParams();

    // Check if vertical nav is open
    const verticalNavHover = appData.verticalNavHover;

    // Set style dependent on if nav bar is open
    const businessPgContainerStyle = verticalNavHover
        ? {
              marginLeft: "220px",
              width: "calc(100% - 220px)",
          }
        : {
              marginLeft: "50px",
              width: "calc(100% - 50px)",
          };

    // Set states
    const [specificBusinessInfo, setSpecificBusinessInfo] = useState(null);

    // Get all businesses listed on app
    const allBusinesses = appData.allBusinesses || [];

    // Get the specific business
    const specificBusiness = allBusinesses.find((business) => business.id === parseInt(params.id));
  
    const specificBusinessId = specificBusiness ? specificBusiness.id : null;

    //Get specific logged in user
    const loggedUser = appData.loggedUser
    const loggedUserId = loggedUser? loggedUser.id : null

    //Show user checkins or user
    const userCheckIns = loggedUser ? loggedUser.business_visit : null

    //Show user wishlists
    const userWishList = loggedUser? loggedUser.business_wishlist : null

    // Add additional elements to calculate average review rating
    useEffect(() => {
        if (specificBusinessId) {
            fetch(`/businesses/${specificBusinessId}`)
                .then((r) => {
                    if (r.ok) {
                        return r.json();
                    }
                    throw r;
                })
                .then((specificBusinessInfo) => {
                    const reviewRatings = specificBusinessInfo.business_reviews.map((ratings) => ratings.review_rating);
                    const totalSum = reviewRatings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    const averageRating = reviewRatings.length ? (totalSum / reviewRatings.length).toFixed(1) : "N/A";

                    specificBusinessInfo.numberReviews = reviewRatings.length;
                    specificBusinessInfo.averageRating = averageRating;

                    setSpecificBusinessInfo(specificBusinessInfo);
                })
                .catch((error) => {
                    console.error("Error fetching business info:", error);
                });
        }
    }, [specificBusinessId]);


    //Set up business name
    const businessName = specificBusinessInfo ? specificBusinessInfo.name : null

    //Set up business intro
    const businessInfo = specificBusinessInfo? specificBusiness.user_info : null

    //Set prefecturePicture
    const businessPicture = specificBusinessInfo ? specificBusinessInfo.profile_picture : null
    
    //Set up the average review of business
    const averageReview = specificBusinessInfo? specificBusinessInfo.averageRating : null

    //Set up the number of reviews
    const reviewNumbers = specificBusinessInfo? specificBusinessInfo.business_reviews.length : null

    //Set up business phone number
    const businessNumber = specificBusinessInfo? specificBusinessInfo.contact_number : null 

    //Set up business email
    const businessEmail = specificBusinessInfo? specificBusinessInfo.email : null 

    //Set up business register date
    const businessRegistered = specificBusinessInfo ? specificBusinessInfo.date_registered : null 

    //Set up business address
    const businessBuildingNumber = specificBusinessInfo ? specificBusinessInfo.building_numbers : null
    const businessNeighbourHood = specificBusinessInfo ? specificBusinessInfo.neighbourhood : null 
    const businessCity = specificBusinessInfo ? specificBusinessInfo.city : null 
    const businessPrefecture = specificBusinessInfo ? specificBusinessInfo.prefecture.prefecture_name : null
    const businessPostCode = specificBusinessInfo ? specificBusinessInfo.postal_code : null 
    const businessAddress = `${businessBuildingNumber}, ${businessNeighbourHood}, ${businessCity}, ${businessPrefecture}, ${businessPostCode}`

    //Set up business operation times
    const businessOpeningTime = specificBusinessInfo ? specificBusinessInfo.opening_time : null
    const businessClosingTime = specificBusinessInfo ? specificBusinessInfo.closing_time : null
    const businessOperatingHours = `${businessOpeningTime} - ${businessClosingTime}`

    //Set up current business reviews
    const currentBusinessReviews = specificBusinessInfo? specificBusinessInfo.business_reviews : null 

    return (
        <div id="businessPgContainer" style={businessPgContainerStyle}>
            <div id="renderedBusinessInfoContainer">
                <BusinessPicture 
                    businessPicture={businessPicture} 
                    businessName = {businessName}
                />

                <BusinessNameInfo 
                    businessName={businessName}
                    businessInfo={businessInfo}
                />

                <BusinessIntroAvReview 
                    averageReview={averageReview}
                    reviewNumbers={reviewNumbers}
                />

                <BusinessCheckInWishList 
                    specificBusinessId={specificBusinessId}
                    loggedUserId={loggedUserId}
                    userCheckIns={userCheckIns}
                    businessName={businessName}
                    userWishList={userWishList}
                />
            </div>

            <div id="renderedPrefectureGrid">
                <BusinessInfoContainer 
                    businessNumber={businessNumber}
                    businessEmail={businessEmail}
                    businessRegistered={businessRegistered}
                    businessAddress={businessAddress}
                    businessOperatingHours={businessOperatingHours}
                />

                <BusinessFeed 
                    currentBusinessReviews={currentBusinessReviews}
                    loggedUser={loggedUser}
                    specificBusinessId={specificBusinessId}
                />
            </div>
        </div>
    );
}

export default BusinessPg;