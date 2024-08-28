import { useState } from "react"
import "./BusinessPictureBlogs.css"

import BusinessPictures from "./BusinessPictures"

function BusinessPictureBlogs({
    specificBusinessId,
    loggedUserId,
    appData,
    prefectureId
}){
    const [selectChoice, setSelectChoice] = useState("Pictures")

    const avaliableChoice = ["Pictures", "Blogs"]

    const renderOptions = avaliableChoice.map((category, index) => (
        <h1 
            key={index}
            className="businessCategoriesOption"
            id={category===selectChoice ? "selectedBusinessCategoryOption" : null}
            onClick={() => setSelectChoice(category)}
        >
            {category}
        </h1>
    ))
    return(
        <div id="pictureBlogContainer">
            <div id="pictureBlogChoiceGrid">
                {renderOptions}
            </div>

            {selectChoice === "Pictures" ? 
                <BusinessPictures 
                    specificBusinessId={specificBusinessId}
                    loggedUserId={loggedUserId}
                    appData={appData}
                    prefectureId={prefectureId}
                />
                :
                null
            }
        </div>
    )
}
export default BusinessPictureBlogs