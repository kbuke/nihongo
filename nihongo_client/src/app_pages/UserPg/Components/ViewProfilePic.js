import "./ViewProfilePic.css"
import UpdateProfilePic from "./UpdateProfilePic"
import { useState } from "react"

function ViewProfilePic({
    setChangeProfilePic,
    userProfilePics,
    setViewUserPic,
    changeProfilePic,
    userProfilePicId
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
                    <div>
                        <button 
                            onClick={() => setViewUserPic(false)}
                        >
                            Close Window
                        </button>

                        <button
                            onClick={() => setChangeProfilePic(true)}
                        >
                            Update Profile Picture
                        </button>
                    </div>
            }
        </div>
    )
}
export default ViewProfilePic