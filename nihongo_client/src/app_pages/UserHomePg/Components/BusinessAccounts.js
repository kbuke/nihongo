import { useState } from "react";
import "./BusinessAccounts.css";

import { Link } from "react-router-dom";

import locationIcon from "../../../assets/visitedMark.png"

function BusinessAccounts({
    businessRole,
    filterBar,
    selectedPrefecture,
    selectedBusiness
}) {
    console.log(businessRole)

    const [selectedBusinessName, setSelectedBusinessName] = useState("")
    
    const filteredBusinesses = selectedBusiness === "All Businesses" ?
        businessRole
        :
        businessRole.filter(businessInfo => 
            businessInfo.business_types.some(typeInfo => 
                typeInfo.registered_type.business_type === selectedBusiness
            )
        )
    console.log(filteredBusinesses)


    // Filter by prefecture
    const filterPrefectureBusinesses = selectedPrefecture === "All Prefectures" ?
        filteredBusinesses :
        filteredBusinesses.filter(businessInfo => businessInfo.prefecture.prefecture_name === selectedPrefecture);

    // Filter by search term
    const filterSearch = filterPrefectureBusinesses.filter(business => 
        business.name.toLowerCase().includes(filterBar.toLowerCase())
    );

    console.log(filterSearch)

    const businessCard = filterSearch.map((businessInfo, index) => (
        <Link
            key={index}
            className="userCard"
            to={`/business/${businessInfo.id}`}
            style={{
                backgroundImage: `url(${businessInfo.profile_picture.picture_route})`
            }}
            onMouseEnter={() => setSelectedBusinessName(businessInfo.name)}
        >
            <div id="userNameCardContainer">
                <h1
                    id="businessNameOnCard"
                >
                    {businessInfo.name}
                </h1>

                <h3>
                    {businessInfo.business_reviews.length > 0 ?
                        (
                            `${(businessInfo.business_reviews.reduce((accumulator, review) => (
                                accumulator + review.review_rating
                            ), 0) / businessInfo.business_reviews.length)
                            .toFixed(1)} ⭐️`
                        )
                        :
                        ""
                    }
                </h3>

                <div id="userCardTypesGrid">
                    {businessInfo.business_types.length > 0 ?
                        businessInfo.business_types.map((type, index) => (
                            <div 
                                key={index}
                                id="businessCardTypeContainer"
                            >
                                <h3
                                    id="businessCardTypeText"
                                >
                                    {type.registered_type.business_type}
                                </h3>
                            </div>
                        ))
                        :
                        ""
                    }
                </div>

                {selectedBusinessName === businessInfo.name ? 
                    <div
                        id="businessUserCardLocationGrid"
                    >
                        <div id="businessUserCardLocationImgContainer">
                            <img 
                                id="businessUserCardLocationImg"
                                src={locationIcon}
                            />
                        </div>

                        <h5 id="businessUserCardAddress">
                            {businessInfo.building_numbers} {businessInfo.neighbourhood}, {businessInfo.city}, {businessInfo.postal_code}
                        </h5>
                    </div>
                    :
                    null
                }
            </div>
        </Link>
    ));
    


    // const businessCard = filterSearch.map((businessInfo, index) => (
    //     <Link key={index} id="userCard" to={`/business/${businessInfo.id}`}>
    //         <div id="userImgCardContainer">
    //             <img 
    //                 id="userCardImg"
    //                 src={businessInfo.profile_picture.length > 0 ? businessInfo.profile_picture[0].picture_route : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
    //                 alt={`${businessInfo.name}`}
    //             />
    //         </div>

    //         <div id="userNameCardContainer">
    //             <h3>{businessInfo.name}</h3>
    //         </div>

    //         <div id="allBusinessInfoGrid">
    //             <div id="businessInfoCardGrid">
    //                 <>
    //                     <h6>⭐️ {businessInfo.averageRating}</h6>
    //                 </>
                
    //                 <>
    //                     <h6>⏱️ {businessInfo.opening_time} - {businessInfo.closing_time}</h6>
    //                 </>

    //                 <>
    //                     <h6>📍 {businessInfo.prefecture.prefecture_name}</h6>
    //                 </>
    //             </div>

    //             <div id="businessInfoCardGrid">
    //                 {businessInfo.business_types.map(types => (
    //                     <h6 key={types.id}>👤 {types.registered_type.business_type}</h6>
    //                 ))}
    //             </div>
    //         </div>
    //     </Link>
    // ));

    return (
        <>
            {businessCard}
        </>
    );
}

export default BusinessAccounts;


