import { useOutletContext, useParams } from "react-router-dom";
import "./BusinessPg.css";
import { useEffect, useState } from "react";


import BusinessIntro from "./Components/BusinessIntro";
import NewReview from "./Components/NewReview";
import ConfirmReviewDeletion from "./Components/ConfirmReviewDeletion";
import BusinessPictureBlogs from "./Components/BusinessPictureBlogs";

function BusinessPg() {
    const appData = useOutletContext()
    const allBusinesses=appData.allBusinesses
    console.log(allBusinesses)

    //Set states
    const [specificBusinessInfo, setSpecificBusinessInfo] = useState(null);
    const [allCheckIns, setAllCheckIns] = useState([]) 
    const [deleteReview, setDeleteReview] = useState(false)
    const [reviewId, setReviewId] = useState()
    const [newReview, setNewReview] = useState(false)
    const [filterProfilePic, setFilterProfilePic] = useState()
    const [businessesBio, setBusinessesBio] = useState()
    const [businessesCoverPhoto, setBusinessesCoverPhoto] = useState()

    //Set up params
    const params = useParams()

    const specificBusinessProfile = allBusinesses.find(business => business.id === parseInt(params.id))
    console.log(specificBusinessProfile)

    const specificBusinessId = specificBusinessProfile?.id

    useEffect(() => {
        if(specificBusinessId) {
            fetch(`/businesses/${specificBusinessId}`)
                .then(r => {
                    if(r.ok) {
                        return r.json()
                    }
                    throw r 
                })
                .then(specificBusinessInfo => setSpecificBusinessInfo(specificBusinessInfo))
        }
    }, [allBusinesses])

    console.log(specificBusinessInfo)

    //Get businesses profile pic
    const businessPictureInfo = specificBusinessInfo?.profile_picture
    const businessPicture = businessPictureInfo?.picture_route
    console.log(businessPicture)

    //check if vertical nav is open
    const verticalNavHover = appData.verticalNavHover

    const businessPgContainerStyle = verticalNavHover ?
        {
            marginLeft: "220px",
            width: "calc(100% - 220px)"
        }
        :
        {
            marginLeft: "50px",
            width: "calc(100% - 50px"
        }
    
    //Get logged user info
    const loggedUser = appData.loggedUser
    const loggedUserId = loggedUser?.id 

    //Show all business check ins 
    const businessCheckIn = appData.businessCheckIn 
    const setBusinessCheckIn = appData.setBusinessCheckIn 

    const prefectureId = specificBusinessInfo?.prefecture?.id
    
    //Show logged users check ins
    const userCheckIns = loggedUser?.business_reviews 

    //Show all busimess check ins 
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

    //Show logged users reviews
    const userReviews = loggedUser?.business_reviews

    //Set up business name
    const businessName = specificBusinessInfo?.name 

    //Set up businesses cover photo
    useEffect(() => {
        if (specificBusinessInfo && specificBusinessInfo.cover_photo) {
            setBusinessesCoverPhoto(specificBusinessInfo.cover_photo);
        }
    }, [specificBusinessInfo]);

    // const appData = useOutletContext();

    // // Set up useParams
    // const params = useParams();

    // // Check if vertical nav is open
    // const verticalNavHover = appData.verticalNavHover;

    // // Set style dependent on if nav bar is open
    // const businessPgContainerStyle = verticalNavHover
    //     ? {
    //           marginLeft: "220px",
    //           width: "calc(100% - 220px)",
    //       }
    //     : {
    //           marginLeft: "50px",
    //           width: "calc(100% - 50px)",
    //       };

    // // Set states
    // const [specificBusinessInfo, setSpecificBusinessInfo] = useState(null);
    // const [allCheckIns, setAllCheckIns] = useState([]) 
    // const [deleteReview, setDeleteReview] = useState(false)
    // const [reviewId, setReviewId] = useState()
    // const [newReview, setNewReview] = useState(false)
    // const [filterProfilePic, setFilterProfilePic] = useState()
    // const [businessesBio, setBusinessesBio] = useState()
    // const [businessesCoverPhoto, setBusinessesCoverPhoto] = useState()

    //import business wishlists from app.py
    const allWishLists = appData.businessWishlist
    const setAllWishLists = appData.setBusinessWishlist


    // // Get all businesses listed on app
    // const allBusinesses = appData.allBusinesses || [];
    const setAllBusinesses = appData.setAllBusinesses

    // // Get the specific business
    // const specificBusiness = allBusinesses.find((business) => business.id === parseInt(params.id));
  
    // const specificBusinessId = specificBusiness ? specificBusiness.id : null;

    // // const allProfilePics = appData.allProfilePics
    // // console.log(allProfilePics)

    // // const filteredPics = allProfilePics.filter(picture => picture.user_id === specificBusinessId)
    // // console.log(filteredPics)

    // // useEffect(() => (
    // //     setFilterProfilePic(allProfilePics.filter(picture => picture.user_id === specificBusinessId))
    // // ), [allProfilePics])
    // // console.log(`The profile picture is ${filterProfilePic}`)


    // //Get specific logged in user
    // const loggedUser = appData.loggedUser
    // const loggedUserId = loggedUser? loggedUser.id : null

    // console.log(`logged user is id ${loggedUserId}`)

    // //Show all check ins to businesses
    // const businessCheckIn = appData.businessCheckIn
    // const setBusinessCheckIn = appData.setBusinessCheckIn

    // console.log(specificBusiness)
    // const prefectureId = specificBusiness?.prefecture?.id
    // console.log(prefectureId)
 

    // //Show user checkins or user
    // const userCheckIns = loggedUser ? loggedUser.business_visit : []
    

    // // const userReviews = loggedUser ? loggedUser.business_reviews : []

    // //FETCH all check ins
    // useEffect(() => {
    //     fetch('/businesscheckin')
    //         .then(r => {
    //             if(r.ok) {
    //                 return r.json()
    //             }
    //             throw r 
    //         })
    //         .then(checkIns => setAllCheckIns(checkIns))
    //         .catch(error => console.error("Error fetching check-ins", error))
    // }, [userCheckIns])

    


    // // Add additional elements to calculate average review rating
    // useEffect(() => {
    //     if (specificBusinessId) {
    //         fetch(`/businesses/${specificBusinessId}`)
    //             .then((r) => {
    //                 if (r.ok) {
    //                     return r.json();
    //                 }
    //                 throw r;
    //             })
    //             .then((specificBusinessInfo) => {
    //                 setSpecificBusinessInfo(specificBusinessInfo);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching business info:", error);
    //             });
    //     }
    // }, [specificBusinessId]);

    // console.log(specificBusinessInfo)


    // //Set up business name
    // const businessName = specificBusinessInfo ? specificBusinessInfo.name : null

    // //Set up business cover photo
    // // const businessCoverPhoto = specificBusinessInfo?.cover_photo 
    // useEffect(() => {
    //     if (specificBusinessInfo && specificBusinessInfo.cover_photo) {
    //         setBusinessesCoverPhoto(specificBusinessInfo.cover_photo);
    //     }
    // }, [specificBusinessInfo]);
    

    //Set up business intro
    // const businessInfo = specificBusinessInfo?.user_info
    useEffect(() => {
        if (specificBusinessInfo) {
            setBusinessesBio(specificBusinessInfo.user_info);
        }
    }, [specificBusinessInfo]);
    




    // const businessPicture = filterProfilePic && filterProfilePic.length > 0 ? filterProfilePic[0] : null;



    

    //Get all reviews for all businesses
    const allBusinessReviews = appData.allBusinessReviews
    const setAllBusinessReviews =  appData.setAllBusinessReviews


    return (
        <div id="businessPgContainer" style={businessPgContainerStyle}>
                {deleteReview ? 
                    <ConfirmReviewDeletion 
                        setDeleteReview={setDeleteReview}
                        reviewId={reviewId}
                        setAllBusinessReviews={setAllBusinessReviews}
                    />
                    :
                    null
                }

                {newReview ?
                    <NewReview 
                        allBusinessReviews={allBusinessReviews}
                        setAllBusinessReviews={setAllBusinessReviews}
                        setNewReview={setNewReview}
                        loggedUserId={loggedUserId}
                        specificBusinessId={specificBusinessId}
                    />
                    :
                    null
                }

               <BusinessIntro
                    specificBusiness={specificBusinessProfile}
                    // businessCoverPhoto={businessCoverPhoto}
                    businessesCoverPhoto={businessesCoverPhoto}
                    setBusinessesCoverPhoto={setBusinessesCoverPhoto}
                    businessPicture={businessPicture}
                    businessName={businessName}
                    // businessInfo={businessInfo}
                    businessesBio={businessesBio}
                    setBusinessesBio={setBusinessesBio}
                    allCheckIns={allCheckIns}
                    setAllCheckIns={setAllCheckIns}
                    loggedUserId={loggedUserId}
                    businessCheckIn={businessCheckIn}
                    setBusinessCheckIn={setBusinessCheckIn}
                    allWishLists={allWishLists}
                    setAllWishLists={setAllWishLists}
                    allBusinessReviews={allBusinessReviews}
                    setAllBusinessReviews={setAllBusinessReviews}
                    setDeleteReview={setDeleteReview}
                    setReviewId={setReviewId}
                    setNewReview={setNewReview}
                    allBusinesses={allBusinesses}
                    setAllBusinesses={setAllBusinesses}
                    businessPictureInfo={businessPictureInfo}
                />

                <BusinessPictureBlogs 
                    specificBusinessId={specificBusinessId}
                    loggedUserId={loggedUserId}
                    appData={appData}
                    prefectureId={prefectureId}
                />
        </div>
    );
}

export default BusinessPg;