import { useState } from "react"
import "./UserIntro.css"

import UserReviews from "./UserReviews"
import ViewProfilePic from "./ViewProfilePic"

function UserIntro({
    coverPhoto,
    specificUserInfo,
    setViewUserPic,
    viewUserPic,
    userProfilePics,
    loggedUser,
    setUpdateInfo,
    userInfo,
    setUserInfo,
    userHomeTown,
    setUserHomeTown,
    userHomeCountry,
    setUserHomeCountry,
    userCurrentCountry,
    setUserCurrentCountry,
    userCurrentTown,
    setUserCurrentTown,
    userCoverPhoto,
    setUserCoverPhoto
}){
    const[selectedOption, setSelectedOption] = useState("About")

    const availableOptions = ["About", "WishLists", "Reviews"]
    const renderOptions = availableOptions.map((option, index) => (
        <button 
            key={index}
            id={selectedOption === option ? "selectedUserOptionButton" : null}
            className="userOptionButtons"
            onClick={() => setSelectedOption(option)}
        >
            {option}
        </button>
    ))

    const userName = specificUserInfo?.username
    const userRole = specificUserInfo?.role
    const userCurrentLocation = `${userCurrentTown}, ${userCurrentCountry}`
    const userHomeLocation = `${userHomeTown}, ${userHomeCountry}`
    const userId = specificUserInfo?.id    

    //Get specific user reviews
    const userReviews = specificUserInfo?.business_reviews

    return(
        <div 
            id="userIntroContainer"
            style={{
                backgroundImage: `url(${userCoverPhoto})`
            }}
        >

            <div 
                className="userInfoContainer"
                id={selectedOption === "WishLists" || selectedOption === "Reviews" ? "expandedUserInfoContainer" : null}
            >
                {selectedOption === "WishLists" || selectedOption === "Reviews" ? (
                    <>
                        <div id="userProfileInfo">
                            <div 
                                id="userProfileImgContainer"
                                onClick={() => setViewUserPic(true)}
                            >
                                <img 
                                    id="userProfileImg"
                                    src={userProfilePics}
                                />
                            </div>
                            <h1 id="renderUsersName">{userName}</h1>
                            <div id="userRoleRenderedContainer">
                                <h2 id="userRoleRendered">{userRole?.toUpperCase()}</h2>
                            </div>
                            <div id="renderUserOptionsGrid">
                                {renderOptions}
                            </div>
                        </div>
                        <div id="userOtherContent">
                            {selectedOption === "Reviews" ? 
                                <UserReviews 
                                    userReviews={userReviews}
                                />
                                :
                                null
                            }
                        </div>
                    </>
                ) : (
                    <div className="aboutUserProfileInfo">
                        <div 
                            id="userProfileImgContainer"
                            onClick={() => setViewUserPic(true)}
                        >
                            <img 
                                id="userProfileImg"
                                src={userProfilePics}
                            />
                        </div>
                        <h1 id="renderUsersName">{userName}</h1>
                        <div id="userRoleRenderedContainer">
                            <h2 id="userRoleRendered">{userRole?.toUpperCase()}</h2>
                        </div>
                        <div id="renderUserOptionsGrid">
                            {renderOptions}
                        </div>
                        {selectedOption === "About" && (
                            <div id="renderedUserInfoBlock">
                                <h2 id="userInfoText">{userInfo}</h2>
                                <h4 id="userLocations">📍 {userCurrentLocation}</h4>
                                <h4 id="userLocations">🏠 {userHomeLocation}</h4>
                                {loggedUser?.id === userId ?
                                    <button 
                                        id="updateUserInfoButton"
                                        onClick={() => setUpdateInfo(true)}
                                    >
                                        Update Info
                                    </button>
                                    :
                                    null
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
export default UserIntro
