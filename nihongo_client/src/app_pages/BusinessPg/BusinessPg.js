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
    const [allCheckIns, setAllCheckIns] = useState([]) 
    const [allWishLists, setAllWishLists] = useState([])
    const [allBusinessReviews, setAllBusinessReviews] = useState([])


    // Get all businesses listed on app
    const allBusinesses = appData.allBusinesses || [];

    // Get the specific business
    const specificBusiness = allBusinesses.find((business) => business.id === parseInt(params.id));
  
    const specificBusinessId = specificBusiness ? specificBusiness.id : null;

    //Get specific logged in user
    const loggedUser = appData.loggedUser
    const loggedUserId = loggedUser? loggedUser.id : null
    console.log(loggedUser)

    //Show user checkins or user
    const userCheckIns = loggedUser ? loggedUser.business_visit : []
    
    const userWishList = loggedUser ? loggedUser.business_wishlist : []

    // const userReviews = loggedUser ? loggedUser.business_reviews : []

    //FETCH all check ins
    useEffect(() => {
        fetch('/businesscheckin')
            .then(r => {
                if(r.ok) {
                    return r.json()
                }
                throw r 
            })
            .then(checkIns => setAllCheckIns(checkIns))
            .catch(error => console.error("Error fetching check-ins", error))
    }, [userCheckIns])
    console.log(userCheckIns)
    
    //FETCH all wishlists
    useEffect(() => {
        fetch('/businesswishlist')
            .then(r => {
                if(r.ok) {
                    return r.json()
                }
                throw r 
            })
            .then(wishlists => setAllWishLists(wishlists))
            .catch(error => console.error("Error fetching wishlists", error))
    }, [userWishList])

    //FETCH all business reviews
    useEffect(() => {
        fetch('/businessreviews')
            .then(r => {
                if(r.ok) {
                    return r.json()
                }
                throw r
            })
            .then(reviews => setAllBusinessReviews(reviews))
            .catch(error => console.error("Business reviews not found", error))
    }, [])
    console.log(allBusinessReviews)

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
                    setSpecificBusinessInfo(specificBusinessInfo);
                })
                .catch((error) => {
                    console.error("Error fetching business info:", error);
                });
        }
    }, [specificBusinessId]);

    console.log(specificBusinessInfo)
    //Set up business name
    const businessName = specificBusinessInfo ? specificBusinessInfo.name : null

    //Set up business intro
    const businessInfo = specificBusinessInfo? specificBusiness.user_info : null

    //Set prefecturePicture
    // Set prefecturePicture
    const businessPicture = specificBusinessInfo && specificBusinessInfo.profile_picture?.length > 0 
        ? specificBusinessInfo.profile_picture[0].picture_route 
        : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";


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
                    specificBusinessId={specificBusinessId}
                    allBusinessReviews={allBusinessReviews}
                />

                <BusinessCheckInWishList 
                    specificBusinessId={specificBusinessId}
                    loggedUserId={loggedUserId}
                    userCheckIns={userCheckIns}
                    businessName={businessName}
                    userWishList={userWishList}
                    allCheckIns={allCheckIns}
                    setAllCheckIns={setAllCheckIns}
                    allWishLists={allWishLists}
                    setAllWishLists={setAllWishLists}
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
                    // currentBusinessReviews={currentBusinessReviews}
                    loggedUser={loggedUser}
                    specificBusinessId={specificBusinessId}
                    allCheckIns={allCheckIns}
                    allBusinessReviews={allBusinessReviews}
                    setAllBusinessReviews={setAllBusinessReviews}
                />
            </div>
        </div>
    );
}

export default BusinessPg;