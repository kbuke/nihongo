import { useState } from "react"
import "./ViewProfilePic.css"

import ChangeProfilePic from "./ChangeProfilePic"

function ViewProfilePic({
    profilePic,
    setViewProfilePicture,
    businessPicture,
    loggedUserId,
    businessPictureInfo
}){
    const [changePic, setChangePic] = useState(false)
    console.log(businessPicture)
    return(
        <div
            id="profilePictureModal"
        >
            <div
                id="profilePictureModalPictureContainer"
            >
                <img 
                    id="profilePictureModalPicture"
                    src={profilePic}
                />
            </div>

            <div id="profilePictureButtonGrid">
                <button
                    onClick={() => setViewProfilePicture(false)}
                >
                    Close Image
                </button>

                {businessPictureInfo?.user_id === loggedUserId ?
                    <button
                        onClick={() => setChangePic(true)}
                    >
                        Change Profile Picture
                    </button>
                    :
                    null
                }
            </div>

            {changePic === true ? 
                <ChangeProfilePic 
                    pictureId = {businessPictureInfo?.id}
                    setChangePic={setChangePic}
                />
                :
                null
            }
        </div>
    )
}
export default ViewProfilePic