import { useOutletContext, useParams } from "react-router-dom";
import "./BusinessPg.css";
import { useEffect, useState } from "react";

import BusinessPicture from "./Components/BusinessPicture";
import BusinessNameInfo from "./Components/BusinessNameInfo";
import BusinessIntroAvReview from "./Components/BusinessIntroAvReview";
import BusinessCheckInWishList from "./Components/BusinessCheckInWishList";

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

    //Show business checkins or user
    const userCheckIns = loggedUser ? loggedUser.business_visit : null

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
                />
            </div>
        </div>
    );
}

export default BusinessPg;