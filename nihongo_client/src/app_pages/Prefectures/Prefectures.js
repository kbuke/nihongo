import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Prefectures.css";

import EditPrefectureInfo from "./Components/EditPrefectureInfo";
import AllBusinesses from "./Components/AllBusinesses";
import SpecificBusinesses from "./Components/SpecificBusinesses";
import PrefectureReviews from "./Components/PrefectureReviews";
import PrefetcureCheckIn from "./Components/PrefectureCheckIn";
import PrefectureBag from "./Components/PrefectureBag";

function Prefectures() {
    const appData = useOutletContext();

    // Check if the user is an admin
    const loggedUser = appData.loggedUser;
    const userType = loggedUser ? loggedUser.type : null;

    // Check if vertical nav is open
    const verticalNavHover = appData.verticalNavHover;

    const params = useParams();

    const [specificPrefectureInfo, setSpecificPrefectureInfo] = useState(null);
    const [prefectureInfoText, setPrefectureInfoText] = useState("");
    const [editInfo, setEditInfo] = useState(false);
    const [selectedButton, setSelectedButton] = useState("All Account");
    const [orderedBusinesses, setOrderedBusinesses] = useState([]);

    // Get all prefectures
    const allPrefectures = appData.prefectures;
    const setAllPrefectures = appData.setAllPrefectures;

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

    useEffect(() => {
        if (specificPrefectureInfo) {
            const prefectureBusinessTypes = ["All Account", "User"];
            const prefectureBusinesses = specificPrefectureInfo.businesses || [];

            prefectureBusinesses.forEach((businessInfo) => {
                businessInfo.business_types.forEach((types) => {
                    prefectureBusinessTypes.push(types.registered_type.business_type);
                });
            });

            const uniqueBusinesses = [...new Set(prefectureBusinessTypes)].sort();
            setOrderedBusinesses(uniqueBusinesses);
        }
    }, [specificPrefectureInfo]);

    if (!specificPrefectureInfo) return null; // Handle case when specificPrefectureInfo is not yet loaded

    //Show all prefecture businesses
    const prefectureBusinesses = specificPrefectureInfo.businesses || [];

    //Make a copt of businesses in the prefecture
    const copyPrefectureBusinesses = [...prefectureBusinesses];

    // Calculate the average rating for each business
    copyPrefectureBusinesses.forEach(business => {
        const reviewRatings = business.business_reviews.map(ratings => ratings.review_rating);
        const totalSum = reviewRatings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const averageRating = reviewRatings.length ? (totalSum / reviewRatings.length).toFixed(1) : 'N/A';
        business.numberReviews = reviewRatings.length;
        business.averageRating = averageRating;
    });

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

    // Handle button click
    const handleButtonClick = (category) => {
        setSelectedButton(category);
        // Move the selected category to the front and sort the rest
        setOrderedBusinesses((prevOrderedBusinesses) => [
            category,
            ...prevOrderedBusinesses.filter((item) => item !== category).sort()
        ]);
    };

    const prefectureButtons = orderedBusinesses.map((category, index) => (
        <button
            key={index}
            id="categoryButtons"
            className={selectedButton === category ? "selected" : ""}
            onClick={() => handleButtonClick(category)}
        >
            {category}s
        </button>
    ));

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

                        <div id="prefectureInfoCenter">
                            <h2>Reviews</h2>
                            <PrefectureReviews 
                                specificPrefecture={specificPrefecture}
                                loggedUser={loggedUser}
                            />
                        </div>

                        <div id="prefectureInfoRight">
                            <h5>🏛️ {prefectureCapital}</h5>
                            <h5>👤 {renderPop}</h5>
                            <img id="prefectureFlag" alt={`${prefectureName} Flag`} src={prefectureFlag} />
                            <div id="interactiveButtonContainer">
                                <PrefetcureCheckIn 
                                    loggedUser={loggedUser}
                                    specificPrefecture={specificPrefecture}
                                />
                                <PrefectureBag 
                                    loggedUser={loggedUser}
                                    specificPrefecture={specificPrefecture}
                                />
                            </div>
                        </div>
                    </div>
                    <img id="prefectureImg" alt={`${prefectureName} image`} src={prefectureImg} />
                </div>
            </>
            <div id="prefectureCategoryBar">
                {prefectureButtons}
                {selectedButton === "All Account" ? 
                    <AllBusinesses 
                        copyPrefectureBusinesses={copyPrefectureBusinesses}
                        prefectureName={prefectureName}
                    />
                    :
                    <SpecificBusinesses
                        selectedButton={selectedButton}
                        copyPrefectureBusinesses={copyPrefectureBusinesses}
                    />
                }
            </div>
        </div>
    );
}

export default Prefectures;

