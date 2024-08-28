import ViewBigPic from "./ViewBigPic"
import { useState } from "react"

function UserPrefecturePics({
    filterPics,
    setAllPictures,
    loggedUser
}){
    console.log(filterPics)
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

    const sortPics = filterPics.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date))
    const renderPics = sortPics.map((picture, index) => (
        <div
            key={index}
            className="pictureFeedContainer"
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
        >
            <img 
                src={picture.picture_route}
                className="pictureFeedImg"
                onClick={() => setEnlargePic(true)}
            />
        </div>
    ))
    console.log(enlargePic)
    return(
        <div
            id="renderedUserPictureGrid"
        >
            {renderPics}

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
        </div>
    )
}
export default UserPrefecturePics