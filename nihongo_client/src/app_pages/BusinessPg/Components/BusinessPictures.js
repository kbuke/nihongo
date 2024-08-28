import { useState } from "react"

import "./BusinessPictures.css"
import UploadNewPic from "./UploadNewPic"

import plusIcon from "../../../assets/plus icon.png"

function BusinessPictures({
    specificBusinessId,
    loggedUserId,
    appData,
    prefectureId
}){
    const [selectedOption, setSelectedOption] = useState("Uploaded")
    const [uploadPic, setUploadPic] = useState(false)

    const availableOptions = ["Uploaded", "Tagged"]

    const renderOptions = availableOptions.map((option, index) => (
        <h3 
            key={index}
            onClick={() => setSelectedOption(option)}
            className="businessPictureOptionTitles"
            id={selectedOption === option ? "selectedBusinessPictureOption" : null}
        >
            {option}
        </h3>
    ))

    const allPictures = appData.allPictures
    console.log(allPictures)

    //filter Pictures
    const businessPics = allPictures.filter(picture => picture.business_id === specificBusinessId && picture.user_id === specificBusinessId)
    console.log(businessPics)
    const sortPics = businessPics.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date))


    const taggedBusinessPics = allPictures.filter(picture => picture.business_id === specificBusinessId && picture.user_id !== specificBusinessId)
    console.log(taggedBusinessPics)

    const mapPics = selectedOption === "Uploaded" ? (
        sortPics.length === 0 ? (
            <h3>No Pictures Uploaded Yet</h3>
        )
        :
        sortPics.map((picture, index) => (
            <div 
                key={index}
                className="pictureFeedContainer"
            >
                <img 
                    className="pictureFeedImg"
                    src={picture.picture_route}
                />
            </div>
        ))
    )
    :
    taggedBusinessPics.length === 0? (
        <h3>No Tagged Pictures</h3>
    )
    :
    taggedBusinessPics.map((picture, index) => (
        <div
            key={index}
            className="pictureFeedContainer"
        >
            <img 
                className="pictureFeedImg"
                src={picture.picture_route}
            />
        </div>
    ))
    

    return(
        <div id="renderPictureContainer">
            <div id="renderPictureOptionsGrid">
                {renderOptions}
            </div>

            {loggedUserId === specificBusinessId && selectedOption==="Uploaded" ? 
                <button
                    onClick={() => setUploadPic(true)}
                    id="addPictureIconButton"
                >
                    <img 
                        id="addPictureIcon"
                        src={plusIcon}
                    />
                </button>
                :
                null
            }

            <div id="renderedPictureGrid">
                {mapPics}
            </div>

            {uploadPic ?
                <UploadNewPic 
                    appData={appData}
                    specificBusinessId={specificBusinessId}
                    loggedUserId={loggedUserId}
                    prefectureId={prefectureId}
                    setUploadPic={setUploadPic}
                />
                :
                null
            }
        </div>
    )
}
export default BusinessPictures