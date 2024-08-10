import { useState } from "react"
import { useEffect } from "react"

import "./BusinessPictures.css"

function BusinessPictures({
    specificBusinessId
}){
    const [allPictures, setAllPictures] = useState([])
    const [pictureType, setPictureType] = useState("SELF")

    const photoOptions = ["SELF", "TAGGED"]

    const renderPhotoOptions = photoOptions.map((option, index) => (
        <h4 
            key={index}
            id={pictureType === option ? "selectedPhotoOption" : null}
            onClick={() => setPictureType(option)}
            className="photoOption"
        >
            {option}
        </h4>
    ))


    //Get all pictures
    useEffect(() => {
        fetch("/prefecturepics")
            .then((r) => {
                if(r.ok) {
                    return r.json()
                }
                throw r 
            })
            .then((pics) => setAllPictures(pics))
            .catch((error) => console.error("Error fetching pictures", error))
    }, [])

    const taggedPics = allPictures.filter(picture => picture.user_id !== specificBusinessId && picture.business_id === specificBusinessId)


    const sortTaggedPics = taggedPics.sort((a, b) => b.upload_date - a.upload_date)


    const renderTagPics = sortTaggedPics.map((container, index) => (
        <div id="businessesPictureContainer" key={index}>
            <img 
                src={container.picture_route}
                id="businessPictureRender"
            />
        </div>
    ))

    return(
        <div
            id="businessPictureGrid"
        >
            <div id="businessPictureOptionsGrid">
                {renderPhotoOptions}
            </div>

            <div id="specificBusinessPictureGrid">
                {pictureType === "SELF" ? 
                    null
                    :
                    renderTagPics
                }
            </div>
        </div>
    )

    
}
export default BusinessPictures