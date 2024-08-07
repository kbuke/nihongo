import { useState } from "react";
import "./UserInfo.css";

import { useEffect } from "react";

import PrefectureBusinessVisits from "./PrefectureBusinessVisits";
import UserUploadPictures from "./UserUploadPictures";
import UserPictures from "./UserPictures";

function UserInfo({ specificUserInfo }) {
    const [selectedPrefecture, setSelectedPrefecture] = useState(null);
    const [selectedPrefectureId, setSelectedPrefectureId] = useState(null);
    const [selectedPrefectureFlag, setSelectedPrefectureFlag] = useState(null);
    const [selectedPrefectureImg, setSelectedPrefectureImg] = useState(null);
    const [selectedBusiness, setSelectedBusiness] = useState("");
    const [selectedUserOption, setSelectedUserOption] = useState("Pictures");
    const [allPictures, setAllPictures] = useState([])

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

    const userOptions = ["Pictures", "Visited Prefectures", "Blogs"];

    const renderOptions = userOptions.map((option, index) => (
        <h6
            key={index}
            className="userProfileHeaders"
            id={selectedUserOption === option ? "selectedUserProfileHeader" : null}
            onClick={() => setSelectedUserOption(option)}
        >
            {option}
        </h6>
    ));

    const prefectureVisits = specificUserInfo.prefecture_visit;

    // Show all businesses the user account has been to, and filter them based on prefectures visited
    const businessCheckIns = specificUserInfo.business_visit;

    const filterBusinessPrefecture = businessCheckIns ? businessCheckIns.filter(business => business.business.prefecture_id === selectedPrefectureId) : [];

    // Set the selected prefecture info
    const setPrefectureInfo = (prefectureName, prefectureId, prefectureFlag, prefectureImg) => {
        setSelectedPrefecture(prefectureName);
        setSelectedPrefectureId(prefectureId);
        setSelectedPrefectureFlag(prefectureFlag);
        setSelectedPrefectureImg(prefectureImg);
        setSelectedBusiness("");
    };

    const renderedPrefectureButtons = prefectureVisits ? prefectureVisits.map((prefecture, index) => (
        <button key={index}
            onClick={() => setPrefectureInfo(
                prefecture.prefecture.prefecture_name,
                prefecture.prefecture.id,
                prefecture.prefecture.prefecture_flag,
                prefecture.prefecture.prefecture_img
            )}
            id="prefectureVisitedButtons"
            className={prefecture.prefecture.prefecture_name === selectedPrefecture ? "selectedPrefecture" : null}
        >
            {prefecture.prefecture.prefecture_name}
        </button>
    )) : null;

    return (
        <div id="selectedPrefectureBlock">
            <div id="userOptionsGrid">
                {renderOptions}
            </div>

            {selectedUserOption === "Visited Prefectures" ? 
                <div id="visitedPrefectureButtonGrid">
                    {renderedPrefectureButtons}
                </div> 
            : null }

            {selectedUserOption === "Visited Prefectures" && selectedPrefecture ?
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
            : null }

            {selectedUserOption === "Pictures" ? 
                <div>
                    <UserUploadPictures 
                        specificUserInfo={specificUserInfo}
                        allPictures={allPictures}
                        setAllPictures={setAllPictures}
                    />

                    <UserPictures 
                        specificUserInfo={specificUserInfo}
                        allPictures={allPictures}
                    />
                </div>
            : null }

            {selectedUserOption === "Blogs" ? 
                <div>Show Blogs Here</div>
            : null }
        </div>
    );
}

export default UserInfo;

