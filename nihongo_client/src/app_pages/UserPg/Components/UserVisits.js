import { useState } from "react"
import "./UserVisits.css"

import UserSpecificPrefecture from "./UserSpecificPrefecture"

function UserVisits({
    specificUserInfo,
    appData,
    loggedUser
}){
    const visitedPrefectures = specificUserInfo.prefecture_visit
    console.log(visitedPrefectures)
    const [selectedPrefecture, setSelectedPrefecture] = useState(false)

    const [selectedPrefectureId, setSelectedPrefectureId] = useState()
    const [selectedPrefectureImg, setSelectedPrefectureImg] = useState()
    const [selectedPrefectureName, setSelectedPrefectureName] = useState()

    const handlePrefectureInfo = (prefectureId, prefectureImg, prefectureName) => {
        setSelectedPrefecture(true)
        setSelectedPrefectureId(prefectureId)
        setSelectedPrefectureImg(prefectureImg)
        setSelectedPrefectureName(prefectureName)
    }

    console.log(selectedPrefectureId)

    const renderVisitedPrefectures = visitedPrefectures.map((prefetcureInfo, index) => (
        <div
            id="visitedPrefectureContainer"
            style={{backgroundImage: `url(${prefetcureInfo.prefecture.prefecture_img})`}}
            onClick={() => handlePrefectureInfo(
                prefetcureInfo.prefecture_id,
                prefetcureInfo.prefecture.prefecture_img,
                prefetcureInfo.prefecture.prefecture_name
            )}
            key={index}
        >
            <h1 id="visitedPrefectureName">{prefetcureInfo.prefecture.prefecture_name}</h1>
        </div>
    ))

    return(
        <div id="renderVisitedPrefectureContainer">
            {selectedPrefecture ?
                <div 
                    id="visitedSpecificPrefectueContainer"
                >
                    <UserSpecificPrefecture 
                        selectedPrefectureId={selectedPrefectureId}
                        selectedPrefectureImg={selectedPrefectureImg}
                        selectedPrefectureName={selectedPrefectureName}
                        specificUserInfo={specificUserInfo}
                        appData={appData}
                        loggedUser={loggedUser}
                    />
                </div>
                :
                <div id="renderVisitedPrefecturesGrid">
                    {renderVisitedPrefectures}
                </div>
            }
        </div>
    )
}
export default UserVisits