import { useEffect, useState } from "react"

import "./PrefecturePictures.css"

function PrefecturePictures({
    appData,
    specificPrefectureId
}){
    const [filterPictures, setFilterPictures] = useState()
    const allPictures = appData.allPictures
    console.log(allPictures)

    useEffect(() => (
        setFilterPictures(allPictures.filter(picture => picture.prefecture_id === specificPrefectureId))
    ), [allPictures])

    console.log(filterPictures)

    const sortPrefecturePics = filterPictures?.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date))

    const renderedPics = sortPrefecturePics?.map((picture, index) => (
        <div 
            id="specificPrefecturePicContainer"
            key={index}
        >
            <img 
                src={picture.picture_route}
                id="specificPrefecturePic"
            />
        </div>
    ))

    return(
        <div id="specificPrefecturePicturesGrid">
            {renderedPics}
        </div>
    )

}
export default PrefecturePictures