import { useEffect, useState } from "react"

import "./UserPictureFeed.css"

import UploadNewPicture from "./UploadNewPicture"
import newPicLogo from "../../../assets/plus icon.png"
import ViewBigPic from "./ViewBigPic"

function UserPictureFeed({
    specificUserInfo,
    loggedUser,
    appData
}){
    const [filterUserPictures, setFilterUserPictures] = useState([])
    const [uploadNewPic, setUploadNewPic] = useState(false)
    const [enlargePic, setEnlargePic] = useState(false)
    const [pictureRoute, setPictureRoute] = useState()
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()
    const [userImg, setUserImg] = useState()
    const [prefectureId, setPrefectureId] = useState()
    const [prefectureName, setPrefectureName] = useState()
    const [prefectureImg, setPrefectureImg] = useState()
    const [businessId, setBusinessId] = useState()
    const [businessName, setBusinessName] = useState()
    const [businessImg, setBusinessImg] = useState()
    const [picDate, setPicDate] = useState()
    const [picId, setPicId] = useState()

    //Get all pictures uploaded
    const allPictures = appData.allPictures 
    const setAllPictures = appData.setAllPictures

    useEffect(() => {
        setFilterUserPictures(allPictures.filter(picture => picture.user_id === specificUserInfo.id))
    }, [allPictures, specificUserInfo])


    const sortDates = filterUserPictures.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date))
    console.log(sortDates)
    
    const handleClick = (
        selectedPicture, 
        userId,
        userName,
        userPic,
        prefectureId,
        prefectureImg,
        prefectureName,
        businessId,
        businessName,
        businessPic,
        pictureDate,
        picId
    ) => {
        setPictureRoute(selectedPicture)
        setUserId(userId)
        setUserName(userName)
        setUserImg(userPic)
        setPrefectureId(prefectureId)
        setPrefectureImg(prefectureImg)
        setPrefectureName(prefectureName)
        setBusinessId(businessId)
        setBusinessName(businessName)
        setBusinessImg(businessPic)
        setPicDate(pictureDate)
        setPicId(picId)
    }
    console.log(`I have chosen picture ${pictureRoute} taken by ${userName}, user number ${userId}, image ${userImg}. The picture was taken in ${prefectureName}, which is prefecture ${prefectureId} with an image of ${prefectureImg}. It is from ${businessName} which is business ${businessId} with image ${businessImg}`)

    const renderPics = filterUserPictures.length === 0 ?
        <h2>No Pictures Uploaded Yet</h2>
        :
        sortDates.map((picture, index) => (
            <div 
                key={index}
                className="pictureFeedContainer"
                onClick={() => setEnlargePic(true)}
            >
                <img 
                    className="pictureFeedImg"
                    src={picture.picture_route}
                    onClick={() => handleClick(
                        picture.picture_route,
                        picture.user_id,
                        picture.user.username,
                        picture.user.profile_picture.picture_route,

                        picture.prefecture_id,
                        picture.prefecture.prefecture_img,
                        picture.prefecture.prefecture_name,

                        picture.business_id? picture.business_id : "",
                        picture.business?.name,
                        picture.business?.profile_picture?.picture_route,

                        picture.upload_date.slice(0, 10),

                        picture.id
                    )}
                />
            </div>
        ))

    return(
        <div>
            {loggedUser?.id === specificUserInfo?.id ?
                <div id="uploadNewPicButton">
                    <button 
                        onClick={() => setUploadNewPic(true)}
                        id="newPicUploadButton"
                    >
                        <img 
                            src={newPicLogo}
                            id="newPicUploadLogoImg"
                        />
                    </button>

                    {uploadNewPic ? 
                        <UploadNewPicture 
                            setUploadNewPic={setUploadNewPic}
                            specificUserInfo={specificUserInfo}
                            appData={appData}
                            loggedUser={loggedUser}
                            allPictures={allPictures}
                            setAllPictures={setAllPictures}
                        />
                        :
                        null
                    }
                </div>
                :
                null 
            }

            {enlargePic ?
                <ViewBigPic 
                    setEnlargePic={setEnlargePic}
                    pictureRoute={pictureRoute}
                    userId={userId}
                    userName={userName}
                    userImg={userImg}
                    prefectureId={prefectureId}
                    prefectureName={prefectureName}
                    prefectureImg={prefectureImg}
                    businessId={businessId}
                    businessName={businessName}
                    businessImg={businessImg}
                    picDate={picDate}
                    loggedUser={loggedUser}
                    picId={picId}
                    setAllPictures={setAllPictures}
                />
                :
                null
            }

            <div id="renderedUserPictureGrid">
                {renderPics}
            </div>
        </div>
    )
}
export default UserPictureFeed