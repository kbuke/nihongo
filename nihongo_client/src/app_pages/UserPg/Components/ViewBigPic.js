import UserPg from "../UserPg"
import "./ViewBigPic.css"

import { Link } from "react-router-dom"

import exitCross from "../../../assets/exitButton.png"
import dump from "../../../assets/binIcon.png"

function ViewBigPic({
    setEnlargePic,
    pictureRoute,
    userId,
    userName,
    userImg,
    prefectureId,
    prefectureName,
    prefectureImg,
    businessId,
    businessName,
    businessImg,
    picDate,
    loggedUser,
    picId,
    setAllPictures
}){
    console.log("hope this works")

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/prefecturepics/${picId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllPictures(pictures => pictures.filter(picture => picture.id !== picId))
                }
            })
            .then(setEnlargePic(false))
    }

    return(
        <div
            id="viewBigPictureContainer"
        >
            <div
                id="viewBigPictureGrid"
            >
                <div
                    id="viewSpecificBigPictureContainer"
                >
                    <img 
                        src={pictureRoute}
                        id="specificBigPicture"
                    />
                </div>

                <div
                    id="viewBigPicSpecificInfoContainer"
                >
                    <div
                        id="viewBigPicSpecificUserInfo"
                    >
                        <Link
                            id="viewBigPicSpecificUserPicContainer"
                            to={`/users/${userId}`}
                            onClick={() => setEnlargePic(false)}
                        >
                            <img 
                                id="viewBigPicSpecificUserImg"
                                src={userImg}
                            />
                        </Link>

                        <div
                            id="viewBigPicSpecificUserInfoColumn"
                        >
                            <h4
                                className="viewBigPicSpecificUserNameInfo"
                            >
                                {userName}
                            </h4>
                            <h4
                                className="viewBigPicSpecificUserDateInfo"
                            >
                                Uploaded: {picDate}
                            </h4>
                        </div>
                    </div>

                    <Link
                        id="viewBigPicSpecificPrefectureContainer"
                        style={{
                            backgroundImage: `url(${prefectureImg})`
                        }}
                        to={`/prefectures/${prefectureId}`}
                    >
                        <div
                            id="viewBigPicSpecificPrefectureNameContainer"
                        >
                            <h2
                                id="viewBigPicSpecificPrefectureName"
                            >
                                {prefectureName}
                            </h2>
                        </div>
                    </Link>
                    
                    {businessId ?
                        <Link
                            id="viewBigPicSpecificBusinessContainer"
                            to={`/business/${businessId}`}
                        >
                            <img 
                                id="viewBigPicSpecificBusinessImg"
                                src={businessImg}
                            />

                            <div
                                id="viewBigPicSpecificBusinessNameContainer"
                            >
                                <h2
                                    id="viewBigPicSpecificBusinessName"
                                >
                                    {businessName}
                                </h2>
                            </div>
                        </Link>
                        :
                        null
                    }

                    <div id="viewBigPicButtonsContainer">
                        {loggedUser.id === userId? 
                            <div 
                                id="viewBigPicDeleteSpecificPicContainer"
                                onClick={handleDelete}
                            >
                                <img 
                                    src={dump}
                                    id="viewBigPicDeleteSpecificPic"
                                />
                            </div>
                            :
                            null
                        }

                        <div 
                            id="viewBigPicCloseSpecificPicContainer"
                            onClick={() => setEnlargePic(false)}
                        >
                            <img 
                                src={exitCross}
                                id="viewBigPicCloseSpecificPic"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewBigPic