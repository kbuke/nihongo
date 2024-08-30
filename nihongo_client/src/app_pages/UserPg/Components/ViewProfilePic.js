import "./ViewProfilePic.css"
import UpdateProfilePic from "./UpdateProfilePic"
import { useState } from "react"

function ViewProfilePic({
    setChangeProfilePic,
    userProfilePics,
    setViewUserPic,
    changeProfilePic,
    userProfilePicId,
    loggedUser,
    specificUserProfileId
}){


    console.log(userProfilePics)


  
    return(
        <div id="profilePictureModal">
            <div 
                id="profilePictureModalPictureContainer"
            >
                <img 
                    id="profilePictureModalPicture"
                    src={userProfilePics}
                />
            </div>

            {
                changeProfilePic?
                    <UpdateProfilePic 
                        setChangeProfilePic={setChangeProfilePic}
                        userProfilePicId={userProfilePicId}
                    />
                    :
                    <div id="profilePictureOptionsGrid">
                        <button 
                            onClick={() => setViewUserPic(false)}
                        >
                            Close Window
                        </button>

                        {loggedUser.id === specificUserProfileId ?
                            <button
                                onClick={() => setChangeProfilePic(true)}
                            >
                                Update Profile Picture
                            </button>
                            :
                            null
                        }
                    </div>
            }
        </div>
    )
}
export default ViewProfilePic