import { useEffect, useState } from "react"

import "./UserPictures.css"

function UserPictures({
    specificUserInfo,
    allPictures
}){
    console.log(specificUserInfo)
    console.log(allPictures)
    const [filterPictures, setFilterPictures] = useState([])

    const userId = specificUserInfo.id 

    useEffect(() => (
        setFilterPictures(allPictures.filter(picture => (picture.user_id) === (userId)))
    ), [allPictures])

    console.log(filterPictures)

    const renderedPictureContainer = filterPictures.map((picture, index) => (
        <div 
            id="pictureCover" 
            key={index}
        >
            <img 
                src={picture.picture_route}
                id="renderedPicture"
            />
        </div>
    ))

    return(
        <div id="pictureContainer">
            {
                filterPictures.length === 0 ?
                    <h1>No Pictures Uploaded</h1>
                    :
                    <div id="uploadedUserPicsGrid">
                        {renderedPictureContainer}
                    </div>
            }
        </div>
    )
}
export default UserPictures