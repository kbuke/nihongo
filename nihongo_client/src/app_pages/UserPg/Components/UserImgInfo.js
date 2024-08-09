import { useEffect, useState } from "react"
import "./UserImgInfo.css"
import { useOutletContext, useParams } from "react-router-dom"

import UpdateProfilePic from "./UpdateProfilePic"

function UserImgInfo({
    userName,
    userInfo,
    userPic,
    userRole,
    changeUserPic,
    setChangeUserPic,
    numberReviews,
    numberCheckIns,
    homeCountry,
    homeTown,
    currentCountry,
    currentTown,
    loggedUser,
    specificUserInfo
}){
    const appData = useOutletContext()
    const params = useParams()

    const [specificUserPic, setSpecificUserPic] = useState([])
    const [updateProfilePic, setUpdateProfilePic] = useState(false)


    const allProfilePics = appData.allProfilePics

    const specificProfilePic = allProfilePics.find(picture => picture.user_id === parseInt(params.id))

    const specificProfilePicId = specificProfilePic ? specificProfilePic.id : null;

    const userProfilePic = specificUserPic.picture_route? specificUserPic.picture_route : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"

    useEffect(() => {

        if(specificProfilePicId){
            fetch(`/profilepics/${specificProfilePicId}`)
                .then(r => {
                    if(r.ok) {
                        return r.json()
                    }
                    throw r 
                })
                .then(specificPicInfo => setSpecificUserPic(specificPicInfo))
        }
    }, [allProfilePics])


    return(
        <div id="userPicIntroGrid">
            {updateProfilePic ?
                <UpdateProfilePic 
                    setUpdateProfilePic={setUpdateProfilePic}
                    specificProfilePicId={specificProfilePicId}
                />
                :
                null
            }
            <div id="userImgBlock">
                <img 
                    id="userImg"
                    src={userProfilePic}
                    alt={`${userName} Img`}
                    onClick={() => setChangeUserPic(!changeUserPic)}
                />
                {changeUserPic && specificUserInfo.id === loggedUser.id ? 
                    <div id="userImgOptions">
                        <button 
                            id="changeImgButton"
                            onClick={() => setUpdateProfilePic(true)}
                        >
                            Change Profile Picture
                        </button>
                        <button 
                            id="cancelButton"
                            onClick={() => setChangeUserPic(false)}
                        >
                            Close Options
                        </button>
                    </div>
                    :
                    null
                }
            </div>

            <div id="userInfoBlock">
                <div id="userNameGrid">
                    <h1>{userName}</h1>
                    <div id="userRoleContainer">
                        <h5>{userRole}</h5>
                    </div>
                </div>
                <h3>{userInfo}</h3>
                <div id="countryTownGrid">
                    <h4>🏠 - {homeTown}, {homeCountry}</h4>
                    <h4>📍 - {currentTown}, {currentCountry}</h4>
                </div>
            </div>

            <div id="userActivityInfoBlock">
                <h4>👍 - {numberReviews} Reviews</h4>
                <h4>📍 - {numberCheckIns} Check-Ins</h4>
                <h4>📝 - Blogs</h4>
            </div>
        </div>
    )
}
export default UserImgInfo