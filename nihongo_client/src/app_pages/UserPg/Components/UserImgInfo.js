import { useState } from "react"
import "./UserImgInfo.css"

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
    currentTown
}){
    return(
        <div id="userPicIntroGrid">
            <div id="userImgBlock">
                <img 
                    id="userImg"
                    src={userPic}
                    alt={`${userName} Img`}
                    onClick={() => setChangeUserPic(!changeUserPic)}
                />
                {changeUserPic ? 
                    <div id="userImgOptions">
                        <button id="changeImgButton">Change Profile Picture</button>
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