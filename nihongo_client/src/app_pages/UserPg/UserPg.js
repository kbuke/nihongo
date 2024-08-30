import { useOutletContext, useParams } from "react-router-dom"
import "./UserPg.css"
import { useEffect, useState } from "react";

import UserImgInfo from "./Components/UserImgInfo";
// import UserInfo from "./Components/UserInfo";
import UserIntro from "./Components/UserIntro";
import ViewProfilePic from "./Components/ViewProfilePic";
import UpdateProfilePic from "./Components/UpdateProfilePic";
import UserOptions from "./Components/UserOptions";
import UpdateUserInfo from "./Components/UpdateUserInfo";


function UserPg(){
 
    const appData = useOutletContext()
    const params = useParams()

    const [specificUserInfo, setSpecificUserInfo] = useState([])
    const [viewUserPic, setViewUserPic] = useState(false)
    const [changeProfilePic, setChangeProfilePic] = useState(false)
    const [updateInfo, setUpdateInfo] = useState(false)




    //Get the current logged in user
    const loggedUser = appData.loggedUser

    //Get all prefecture wishlists
    const allUsers = appData.users
    const setAllUsers = appData.setUsers 

    //Show specific user profile
    const specificUserProfile = allUsers.find(user => user.id === parseInt(params.id))
    console.log(specificUserInfo)
    

    const specificUserProfileId = specificUserProfile?.id


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
    const userProfilePicId = specificUserInfo.profile_picture?.id? specificUserInfo.profile_picture.id : null
    const coverPhoto = specificUserInfo?.cover_photo
    const userInfo = specificUserInfo?.user_info
    const userHomeTown = specificUserInfo?.hometown
    const userHomeCountry = specificUserInfo?.home_country
    const userCurrentTown = specificUserInfo?.current_town
    const userCurrentCountry = specificUserInfo?.current_country
    const userCoverPhoto = specificUserInfo?.cover_photo
    const userProfilePics = specificUserInfo.profile_picture?.picture_route

    

    console.log(`i am ${userInfo} from ${userHomeTown}, ${userHomeCountry} living ${userCurrentTown}, ${userCurrentCountry}`)


    return (
        <div 
            id="userPgContainer"
            style={userHomeStyle}
        >
            {updateInfo ?
                <UpdateUserInfo 
                    userInfo={userInfo}
                    userHomeTown={userHomeTown}
                    userHomeCountry={userHomeCountry}
                    userCurrentCountry={userCurrentCountry}
                    userCurrentTown={userCurrentTown}
                    userCoverPhoto={userCoverPhoto}
                    specificUserProfileId={specificUserProfileId}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    setUpdateInfo={setUpdateInfo}
                />
                :
                null
            }

            {viewUserPic ? 
                <ViewProfilePic 
                    setViewUserPic={setViewUserPic}
                    userProfilePics={userProfilePics}
                    setChangeProfilePic={setChangeProfilePic}
                    specificUserInfo={specificUserInfo}
                    changeProfilePic={changeProfilePic}
                    userProfilePicId={userProfilePicId}
                    loggedUser={loggedUser}
                    specificUserProfileId={specificUserProfileId}
                />
                :
                null
            }
            <>
                <UserIntro 
                    coverPhoto={coverPhoto}
                    specificUserInfo={specificUserInfo}
                    setViewUserPic={setViewUserPic}
                    viewUserPic={viewUserPic}
                    userProfilePics={userProfilePics}
                    loggedUser={loggedUser}
                    setUpdateInfo={setUpdateInfo}
                    userInfo={userInfo}
                    userHomeTown={userHomeTown}
                    userHomeCountry={userHomeCountry}
                    userCurrentCountry={userCurrentCountry}
                    userCurrentTown={userCurrentTown}
                    userCoverPhoto={userCoverPhoto}
                />
            </>

            <>
                <UserOptions 
                    specificUserInfo={specificUserInfo}
                    loggedUser={loggedUser}
                    appData={appData}
                />
            </>
        </div>
    )
}
export default UserPg