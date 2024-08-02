import { useState } from "react";
import "./UserInfo.css";

import PrefectureBusinessVisits from "./PrefectureBusinessVisits";

function UserInfo({ specificUserInfo }) {
    const [selectedPrefecture, setSelectedPrefecture] = useState(null);
    const [selectedPrefectureId, setSelectedPrefectureId] = useState(null)
    const [selectedPrefectureFlag, setSelectedPrefectureFlag] = useState(null) 
    const [selectedPrefectureImg, setSelectedPrefectureImg] = useState(null)
    const [selectedBusiness, setSelectedBusiness] = useState("");

    const prefectureVisits = specificUserInfo.prefecture_visit;

    //Show all businesses the user account has been to, and filter them based on prefectures visited
    const businessCheckIns = specificUserInfo.business_visit 

    const filterBusinessPrefecture = businessCheckIns? businessCheckIns.filter(business => business.business.prefecture_id === selectedPrefectureId) : []

    //Set the selected prefecture info
    const setPrefectureInfo = (prefecturName, prefectureId, prefectureFlag, prefectureImg) => {
        setSelectedPrefecture(prefecturName)
        setSelectedPrefectureId(prefectureId)
        setSelectedPrefectureFlag(prefectureFlag)
        setSelectedPrefectureImg(prefectureImg)
        setSelectedBusiness("")
    }

    const renderedPrefectureButtons = prefectureVisits? prefectureVisits.map((prefecture, index) => (
        <button key={index}
            onClick={() => setPrefectureInfo(
                prefecture.prefecture.prefecture_name, 
                prefecture.prefecture.id,
                prefecture.prefecture.prefecture_flag,
                prefecture.prefecture.prefecture_img
            )}
            id="prefectureVisitedButtons"
            className={prefecture.prefecture.prefecture_name === selectedPrefecture? "selectedPrefecture" : null}
        >
            {prefecture.prefecture.prefecture_name}
        </button>
    ))
    :
    null

    return (
        <div id="selectedPrefectureBlock">
            <div id="visitedPrefectureButtonGrid">
                {renderedPrefectureButtons}
            </div>
            {selectedPrefecture ?
                <PrefectureBusinessVisits 
                    selectedPrefectureFlag={selectedPrefectureFlag}
                    selectedPrefectureId={selectedPrefectureId}
                    selectedPrefecture={selectedPrefecture}
                    selectedPrefectureImg={selectedPrefectureImg}
                    filterBusinessPrefecture={filterBusinessPrefecture}
                    specificUserInfo={specificUserInfo}
                    selectedBusiness={selectedBusiness}
                    setSelectedBusiness={setSelectedBusiness}
                />
                :
                null
            }
        </div>
    );
}

export default UserInfo;
