import { useOutletContext, useParams } from "react-router-dom"
import "./UserPg.css"
import { useEffect, useState } from "react";

import UserImgInfo from "./Components/UserImgInfo";
import UserInfo from "./Components/UserInfo";

function UserPg(){
 
    const appData = useOutletContext()
    const params = useParams()

    const [specificUserInfo, setSpecificUserInfo] = useState([])
    const [changeUserPic, setChangeUserPic] = useState(false)

    //Get the current logged in user
    const loggedUser = appData.loggedUser

    //Get all prefecture wishlists
    const allUsers = appData.users

    //Show specific user profile
    const specificUserProfile = allUsers.find(user => user.id === parseInt(params.id))

    const specificUserProfileId = specificUserProfile? specificUserProfile.id : null

    useEffect(() => {
        if(specificUserProfileId) {
            fetch(`/users/${specificUserProfileId}`)
                .then(r => {
                    if(r.ok) {
                        return r.json()
                    }
                    throw r
                })
                .then(specificUserInfo => setSpecificUserInfo(specificUserInfo))
            }
    }, [allUsers])

    //Check if vertical nav hover is on
    const userHomeStyle = appData.verticalNavHover ? 
        {
            marginLeft: "220px",
            width: "calc(100% - 220px)",
        }
        : 
        {
            marginLeft: "50px",
            width: "calc(100% - 50px)",
        };
    
    //Get user INTRO information
    const userName = specificUserInfo? specificUserInfo.username : null 
    const userInfo = specificUserInfo? specificUserInfo.user_info : null
    const userPic = specificUserInfo? specificUserInfo.profile_picture : null
    const userRole = specificUserInfo? specificUserInfo.role : null
    const numberReviews = specificUserInfo.business_reviews? specificUserInfo.business_reviews.length : 0
    const numberCheckIns = specificUserInfo.business_visit ? specificUserInfo.business_visit.length : 0
    const homeTown = specificUserInfo? specificUserInfo.hometown : null 
    const homeCountry = specificUserInfo? specificUserInfo.home_country : null 
    const currentTown = specificUserInfo? specificUserInfo.current_town : null 
    const currentCountry = specificUserInfo? specificUserInfo.current_country : null
    
    return (
        <div 
            id="userPgContainer"
            style={userHomeStyle}
        >
            <>
                <UserImgInfo 
                    userName={userName}
                    userInfo={userInfo}
                    userPic={userPic}
                    userRole={userRole}
                    changeUserPic={changeUserPic}
                    setChangeUserPic={setChangeUserPic}
                    numberReviews={numberReviews}
                    numberCheckIns={numberCheckIns}
                    homeCountry={homeCountry}
                    homeTown={homeTown}
                    currentCountry={currentCountry}
                    currentTown={currentTown}
                    loggedUser={loggedUser}
                    specificUserInfo={specificUserInfo}
                />
            </>

            <div id="mainInfoGrid">
                <UserInfo 
                    specificUserInfo={specificUserInfo}
                    loggedUser={loggedUser}
                />
            </div>
        </div>
    )
}
export default UserPg