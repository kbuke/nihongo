import { Link } from "react-router-dom"
import "./PrefectureBusinessSites.css"
import { useState } from "react"
import { render } from "@testing-library/react"

function PrefectureBusinessSites({ appData, specificPrefecture }) {
    const prefectureId = specificPrefecture.id;

    const [hoveredBusiness, setHoveredBusiness] = useState("");
    const [selectedBusinessType, setSelectedBusinessType] = useState("All");
    const [showRated, setShowRated] = useState(false)

    const allBusiness = appData.allBusinesses;
    const filterBusiness = allBusiness.filter(business => business.prefecture.id === prefectureId);

    const businessTypes = filterBusiness.flatMap(business =>
        business.business_types.map(types =>
            types.registered_type.business_type
        )
    );

    const uniquebusinessTypes = new Set(businessTypes);
    let uniqueBusinessTypesArray = [...uniquebusinessTypes].sort((a, b) => a.localeCompare(b));
    uniqueBusinessTypesArray.unshift("All");

    const renderBusinessTypes = uniqueBusinessTypesArray.map((types, index) => (
        <button
            key={index}
            className="prefectureBusinessTypeButtons"
            id={types === selectedBusinessType ? "selectedPrefectureBusinessTypeButton" : null}
            onClick={() => setSelectedBusinessType(types)}
        >
            <h3>{types}</h3>
        </button>
    ));

    const filterBusinessTypes = selectedBusinessType === "All"
        ? filterBusiness
        : filterBusiness.filter(business =>
            business.business_types.some(type =>
                type.registered_type.business_type === selectedBusinessType
            )
        );

    console.log(filterBusinessTypes)

    const renderAllBusinesses = (business) => {
        return (
            business.map((businessInfo, index) => (
                <Link
                    key={index}
                    id="specificPrefectureBusinessCard"
                    style={{ backgroundImage: `url(${businessInfo.profile_picture.picture_route})` }}
                    onMouseEnter={() => setHoveredBusiness(businessInfo.name)}
                    onMouseLeave={() => setHoveredBusiness("")}
                    to={`/business/${businessInfo.id}`}
                >
                    {hoveredBusiness === businessInfo.name ?
                        <div className="extendedSpecificPrefectureSpecificName">
                            <h1 id="specificPrefectureSpecificBusinessName">{businessInfo.name}</h1>
                            <h2 id="specificPrefectureSpecificBusinessAvRating">
                                {businessInfo.business_reviews.length > 0 ?
                                    `${(businessInfo.business_reviews.reduce(
                                        (accumulator, review) => (
                                            accumulator + review.review_rating
                                        ), 0
                                    ) / businessInfo.business_reviews.length).toFixed(1)}⭐️`
                                    :
                                    <h3 id="specificPrefectureSpecificBusinessAvRating">No Reviews</h3>
                                }
                            </h2>
                            <h3 id="specificPrefectureSpecificBusinessNumberRatings">
                                {businessInfo.business_reviews.length > 0 ?
                                    `(${businessInfo.business_reviews.length} Reviews)`
                                    :
                                    null
                                }
                            </h3>
                            <div id="specificPrefectureSpecificBusinessTypesGrid">
                                {businessInfo.business_types.length > 0 ?
                                    businessInfo.business_types.map((business, index) => (
                                        <div key={index} id="specificPrefectureSpecificBusinessTypesContainer">
                                            <h4 id="specificPrefectureSpecificBusinessTypes">
                                                {business.registered_type.business_type}
                                            </h4>
                                        </div>
                                    ))
                                    :
                                    null
                                }
                            </div>
                            <h3 id="specificPrefectureSpecificBusinessInfo">{businessInfo.user_info}</h3>
                        </div>
                        :
                        <div className="specificPrefectureSpecificName">
                            <h1 id="specificPrefectureSpecificBusinessName">{businessInfo.name}</h1>
                        </div>
                    }
                </Link>
            ))
        );
    };

    return (
        <div>
            <div id="renderBusinessTypeButtonGrid">
                {renderBusinessTypes}
            </div>

            <button
                onClick={() => setShowRated(!showRated)}
            >
                {showRated ?
                    "Show Newly Registered"
                    :
                    "Show Highest Rated"
                }
            </button>

            <div id="specificPrefectureBusinessGrid">
                {renderAllBusinesses(filterBusinessTypes)}
            </div>
        </div>
    );
}
export default PrefectureBusinessSites