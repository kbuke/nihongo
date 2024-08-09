import "./PrefecturePhotos.css"

function PrefecturePhotos({
    selectedPrefectureId,
    specificUserInfo,
    allPictures
}){
    const filterPrefecturePictures = allPictures.filter(picture => picture.prefecture_id === selectedPrefectureId && picture.user_id === specificUserInfo.id)
    console.log(filterPrefecturePictures)

    const renderPrefecturePic = filterPrefecturePictures.map((picture, index) => (
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
        <div id="prefecturePicContainer">
            <div id="pictureContainer">
                {filterPrefecturePictures.length === 0?
                    <h1>No Pictures Uploaded</h1>
                    :
                    <div id="uploadedUserPicsGrid">
                        {renderPrefecturePic}
                    </div>
                }
            </div>
        </div>
    )
}
export default PrefecturePhotos