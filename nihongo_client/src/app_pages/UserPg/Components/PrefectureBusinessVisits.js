import { useState } from "react";
import { Link } from "react-router-dom";
import "./PrefectureBusinessVisits.css";

import UserBusinessCheckIns from "./UserBusinessCheckIns";
import BusinessRelations from "./BusinessRelations";

function PrefectureBusinessVisits({
    selectedPrefectureFlag,
    selectedPrefectureId,
    selectedPrefecture,
    selectedPrefectureImg,
    filterBusinessPrefecture,
    specificUserInfo,
    selectedBusiness,
    setSelectedBusiness
}) {
    const [selectCategory, setSelectCategory] = useState('Photos');
    const [selectedBusinessId, setSelectedBusinessId] = useState()

    const handleClick = (category) => {
        setSelectCategory(category)
        setSelectedBusiness("")
    }

    // Render the available options for user and prefecture relations
    const categoryOptions = ["Photos", "Check-Ins", "Blogs"];

    const renderOptions = categoryOptions.map(categories => (
        <button 
            key={categories}
            onClick={() => handleClick(categories)}
            className={selectCategory === categories ? "chosenButton" : null}
        >
            {categories}
        </button>
    ));

    const businessInfo = filterBusinessPrefecture.filter(business => (
        business.business.name === selectedBusiness
    ));
    const specificBusinessInfo = businessInfo[0] || []; // Provide a default value

    return(
        <div id="visitedPrefectureContainer">
            <div id="visitedPrefectureGrid">
                <Link 
                    id="visitedPrefectureImgContainer"
                    to={`/prefectures/${selectedPrefectureId}`}
                >
                    <img 
                        id="visitedPrefectureImg"
                        src={selectedPrefectureImg}
                        alt={`Image of ${selectedPrefecture}`}
                    />
                </Link>

                <div id="visitedPrefectureInfoBlock">
                    <h1 id="selectedPrefectureTitle">{selectedPrefecture.toUpperCase()}</h1>

                    <div id="visitedPrefectureInfoGrid">
                        {renderOptions}
                    </div>

                    {selectCategory === "Check-Ins" ? 
                        <UserBusinessCheckIns 
                            filterBusinessPrefecture={filterBusinessPrefecture}
                            selectedBusiness={selectedBusiness}
                            setSelectedBusiness={setSelectedBusiness}
                            setSelectedBusinessId={setSelectedBusinessId}
                        />
                        :
                        null
                    }
                </div>
            </div>
            {selectedBusiness ? (
                <BusinessRelations 
                    specificBusinessInfo={specificBusinessInfo}
                    specificUserInfo={specificUserInfo}
                    selectedBusinessId={selectedBusinessId}
                />
            )
                :
                null
            }
        </div>
    );
}

export default PrefectureBusinessVisits;