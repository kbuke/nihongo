import { useState } from "react";
import "./PrefectureInfoContainer.css";

import PrefectureCheckIn from "./PrefectureCheckIn";
import PrefectureWishLists from "./PrefectureWishlist";
import UpdatePrefectureInfo from "./UpdatePrefectureInfo";
import PrefectureRatings from "./PrefetcureRatings";

function PrefectureInfoContainer({
    prefectureCapital,
    prefectureImg,
    prefectureFlag,
    prefectureName,
    prefectureInfo,
    prefecturePopulation,
    loggedUser,
    appData,
    specificPrefectureId
}) {
    const [selectedPrefectureOption, setSelectedPrefectureOption] = useState("About");
    const [updatePrefectureInfo, setUpdatePrefectureInfo] = useState(false);
    const [prefectureInformation, setPrefectureInformation] = useState(prefectureInfo);
    const [prefectureBackgroundImage, setPrefectureBackgroundImage] = useState(prefectureImg);

    const prefectureContainerSelection = ["About", "WishLists", "Check-Ins", "Ratings"];

    const renderPrefectureContainerOptions = prefectureContainerSelection.map((option, index) => (
        <button 
            key={index}
            className={`renderPrefectureInfoOptionButton ${selectedPrefectureOption === option ? "selectedPrefectureInfoOptionButton" : ""}`}
            onClick={() => setSelectedPrefectureOption(option)}
        >
            <h4 className={`renderPrefectureInfoOption ${selectedPrefectureOption === option ? "selectedPrefectureInfoOption" : ""}`}>
                {option}
            </h4>
        </button>
    ));

    return (
        <div
            className="prefectureBackgroundContainer"
            style={{
                backgroundImage: `url(${prefectureBackgroundImage || 'default-image-url'})`
            }}
        >
            {selectedPrefectureOption === "Ratings" ? (
                <PrefectureRatings 
                    appData={appData}
                    prefectureName={prefectureName}
                    prefectureContainerSelection={prefectureContainerSelection}
                    selectedPrefectureOption={selectedPrefectureOption}
                    setSelectedPrefectureOption={setSelectedPrefectureOption}
                    specificPrefectureId={specificPrefectureId}
                />
            ) : (
                <div className="prefectureIntroCover">
                    <div className="prefectureFlagContainer">
                        <img src={prefectureFlag} className="specificPrefectureFlag" alt="Prefecture Flag" />
                    </div>

                    <h1 className="specificPrefectureName">{prefectureName}</h1>

                    <div className="specificPrefectureOptionsGrid">
                        {renderPrefectureContainerOptions}
                    </div>

                    <h3 className="renderedPrefectureInfo">{prefectureInformation}</h3>

                    {selectedPrefectureOption === "About" ? (
                        <>
                            <div className="prefectureExtendedInfoGrid">
                                <h3 className="prefectureExtendedInfoText">👤 - {prefecturePopulation}</h3>
                                <h3 className="prefectureExtendedInfoText">🏛️ - {prefectureCapital}</h3>
                            </div>

                            {loggedUser.role === "Admin" && (
                                <button 
                                    className="alterPrefectureInfoButton"
                                    onClick={() => setUpdatePrefectureInfo(true)}
                                >
                                    Alter {prefectureName}'s Information
                                </button>
                            )}
                        </>
                    ) : selectedPrefectureOption === "Check-Ins" ? (
                        <PrefectureCheckIn 
                            prefectureInfo={prefectureInfo}
                            loggedUser={loggedUser}
                            appData={appData}
                            specificPrefectureId={specificPrefectureId}
                        />
                    ) : selectedPrefectureOption === "WishLists" ? (
                        <PrefectureWishLists 
                            loggedUser={loggedUser}
                            appData={appData}
                            specificPrefectureId={specificPrefectureId}
                        />
                    ) : null}
                </div>
            )}

            {updatePrefectureInfo && (
                <UpdatePrefectureInfo 
                    setUpdatePrefectureInfo={setUpdatePrefectureInfo}
                    prefectureInformation={prefectureInformation}
                    setPrefectureInformation={setPrefectureInformation}
                    specificPrefectureId={specificPrefectureId}
                    prefectureBackgroundImage={prefectureBackgroundImage}
                    setPrefectureBackgroundImage={setPrefectureBackgroundImage}
                    appData={appData}
                />
            )}
        </div>
    );
}

export default PrefectureInfoContainer;
