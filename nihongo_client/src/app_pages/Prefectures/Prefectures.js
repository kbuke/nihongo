import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Prefectures.css";

import EditPrefectureInfo from "./Components/EditPrefectureInfo";
import AllBusinesses from "./Components/AllBusinesses";
import SpecificBusinesses from "./Components/SpecificBusinesses";

function Prefectures() {
    const appData = useOutletContext();

    // Check if the user is an admin
    const loggedUser = appData.loggedUser;
    const userType = loggedUser? loggedUser.type : null;

    // Check if vertical nav is open
    const verticalNavHover = appData.verticalNavHover;

    const params = useParams();

    const [specificPrefectureInfo, setSpecificPrefectureInfo] = useState(null);
    const [prefectureInfoText, setPrefectureInfoText] = useState("");
    const [editInfo, setEditInfo] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null)

    // Get all prefectures
    const allPrefectures = appData.prefectures;
    const setAllPrefectures = appData.setAllPrefectures

    // Get all businesses
    const allBusinesses = appData.allBusinesses;

    const specificPrefecture = allPrefectures.find((prefecture) => prefecture.id === parseInt(params.id));
    const specificPrefectureId = specificPrefecture ? specificPrefecture.id : null;

    useEffect(() => {
        if (specificPrefectureId) {
            fetch(`/prefectures/${specificPrefectureId}`)
                .then((r) => {
                    if (r.ok) {
                        return r.json();
                    }
                    throw r;
                })
                .then((specificPrefectureInfo) => {
                    setSpecificPrefectureInfo(specificPrefectureInfo);
                    setPrefectureInfoText(specificPrefectureInfo.prefecture_info); // Update prefectureInfoText here
                });
        }
    }, [specificPrefectureId]);

    if (!specificPrefectureInfo) return null; // Handle case when specificPrefectureInfo is not yet loaded

    // Get Prefecture Name
    const prefectureName = specificPrefectureInfo.prefecture_name;

    // Get Prefecture Flag
    const prefectureFlag = specificPrefectureInfo.prefecture_flag;

    // Get Prefecture Img
    const prefectureImg = specificPrefectureInfo.prefecture_img;

    // Get Prefecture Info
    const prefectureInfo = specificPrefectureInfo.prefecture_info;

    // Get Prefecture Population
    const prefecturePopulation = specificPrefectureInfo.population;

    // Convert prefecture population into a more readable format
    let renderPop = prefecturePopulation;
    if (1000 <= prefecturePopulation && prefecturePopulation < 999999) {
        renderPop = `${(prefecturePopulation / 1000).toFixed(2)} Thousand`;
    } else if (1000000 <= prefecturePopulation) {
        renderPop = `${(prefecturePopulation / 1000000).toFixed(2)} Million`;
    }

    // Get Prefecture Capital
    const prefectureCapital = specificPrefectureInfo.capital_city;

    // Get Prefecture Businesses
    let prefectureBusinessTypes = []

    const prefectureBusinesses = specificPrefectureInfo.businesses || [];
    // console.log(prefectureBusinesses)

    prefectureBusinesses.map((businessInfo) => {
        businessInfo.business_types.map(types => {
            prefectureBusinessTypes.push(types.registered_type.business_type)
        })
    })

    const uniqueBusinesses = [...new Set(prefectureBusinessTypes.sort())];

    const prefectureButtons = uniqueBusinesses.map((category, index) => (
        <button 
            key={index}
            onClick={() =>setSelectedButton(category)}
        >
            {category}s
        </button>
    ))

    const prefectureContainerStyle = verticalNavHover
        ? {
              marginLeft: "220px",
              width: "calc(100% - 220px)",
          }
        : {
              marginLeft: "50px",
              width: "calc(100% - 50px)",
          };
    

    return (
        <div id="prefecturePgContainer" style={prefectureContainerStyle}>
            <>
                    <div id="prefectureHeaderInfoContainer">
                        <div id="prefectureInfo">
                            <div id="prefectureInfoLeft">
                                <div id="prefectureLeftContainer">
                                    <h1 id="prefectureName">{prefectureName}</h1>
                                        {editInfo ? (
                                            <EditPrefectureInfo
                                                editInfo={editInfo}
                                                setEditInfo={setEditInfo}
                                                prefectureInfoText={prefectureInfoText}
                                                setPrefectureInfoText={setPrefectureInfoText}
                                                specificPrefectureId={specificPrefectureId}
                                                allPrefectures={allPrefectures}
                                                setAllPrefectures={setAllPrefectures}
                                            />
                                        ) : (
                                            <h3 id="prefectureIntroInfo">{prefectureInfo}</h3>
                                        )}

                                        {userType === "Admin" && !editInfo ? (
                                            <button id="editInfoButton" onClick={() => setEditInfo(true)}>
                                                {`Edit ${prefectureName}'s Info`}
                                            </button>
                                        ) : null}
                                </div>
                            </div>
                            <div id="prefectureInfoRight">
                                <h5>🏛️ {prefectureCapital}</h5>
                                <h5>👤 {renderPop}</h5>
                                <img 
                                    id="prefectureFlag"
                                    alt={`${prefectureName} Flag`}
                                    src={prefectureFlag}
                                />
                            </div>
                        </div>
                        <img id="prefectureImg" alt={`${prefectureName} image`} src={prefectureImg} />
                    </div>
            </>
            <div id="prefectureCategoryBar">
                {prefectureButtons}
                <SpecificBusinesses 
                    selectedButton={selectedButton}
                    prefectureBusinesses={prefectureBusinesses}
                />
                {/* <AllBusinesses 
                    prefectureBusinesses={prefectureBusinesses}
                    prefectureName={prefectureName}
                />

                <SpecificBusinesses 
                    prefectureBusinesses={prefectureBusinesses}
                    prefectureName={prefectureName}
                /> */}
            </div>
        </div>
    );
}

export default Prefectures;
