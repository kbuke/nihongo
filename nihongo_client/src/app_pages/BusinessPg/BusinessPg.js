import { useOutletContext, useParams } from "react-router-dom";
import "./BusinessPg.css";
import { useEffect, useState } from "react";


import BusinessIntro from "./Components/BusinessIntro";
import NewReview from "./Components/NewReview";
import ConfirmReviewDeletion from "./Components/ConfirmReviewDeletion";
import BusinessPictureBlogs from "./Components/BusinessPictureBlogs";
import EditReviews from "./Components/EditReviews";

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
    const [editReview, setEditReview] = useState(false)
    const [currentBusinessReview, setCurrentBusinessReview] = useState()
    const [currentBusinessReviewComment, setCurrentBusinessReviewComment] = useState()

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
    console.log(loggedUser)
    const loggedUserId = loggedUser?.id 
    const loggedUserRole = loggedUser?.role

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


    //import business wishlists from app.py
    const allWishLists = appData.businessWishlist
    const setAllWishLists = appData.setBusinessWishlist


    // Get all businesses listed on app
    const setAllBusinesses = appData.setAllBusinesses


    useEffect(() => {
        if (specificBusinessInfo) {
            setBusinessesBio(specificBusinessInfo.user_info);
        }
    }, [specificBusinessInfo]);
    

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

                {editReview ?
                    <EditReviews 
                        setEditReview={setEditReview}
                        reviewId={reviewId}
                        setCurrentBusinessReview={setCurrentBusinessReview}
                        allBusinessReviews={allBusinessReviews}
                        setAllBusinessReviews={setAllBusinessReviews}
                        currentBusinessReview={currentBusinessReview}
                        currentBusinessReviewComment={currentBusinessReviewComment}
                        setCurrentBusinessReviewComment={setCurrentBusinessReviewComment}
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
                    setEditReview={setEditReview}
                    setCurrentBusinessReview={setCurrentBusinessReview}
                    setCurrentBusinessReviewComment={setCurrentBusinessReviewComment}
                    loggedUserRole={loggedUserRole}
                    appData={appData}
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