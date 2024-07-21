import "./BusinessAccounts.css";

function BusinessAccounts({
    businessRole,
    filterBar,
    selectedPrefecture,
    selectedBusiness
}) {
    const businessArrayCopy = [...businessRole];

    businessArrayCopy.forEach(business => {
        const reviewRatings = business.business_reviews.map(ratings => ratings.review_rating);
        const totalSum = reviewRatings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const averageRating = reviewRatings.length ? (totalSum / reviewRatings.length).toFixed(1) : 'N/A';
        business.numberReviews = reviewRatings.length;
        business.averageRating = averageRating;
    });

    console.log(businessArrayCopy);

    // Filter by business type
    const filterBuisnessTypes = selectedBusiness === "All Businesses" ?
        businessArrayCopy :
        businessArrayCopy.filter(businessInfo =>
            businessInfo.business_types.some(typeInfo =>
                typeInfo.registered_type.business_type === selectedBusiness
            )
        );
    console.log(filterBuisnessTypes);

    // Filter by prefecture
    const filterPrefectureBusinesses = selectedPrefecture === "All Prefectures" ?
        filterBuisnessTypes :
        filterBuisnessTypes.filter(businessInfo => businessInfo.prefecture.prefecture_name === selectedPrefecture);
    console.log(filterPrefectureBusinesses);

    // Filter by search term
    const filterSearch = filterPrefectureBusinesses.filter(business => 
        business.name.toLowerCase().includes(filterBar.toLowerCase())
    );

    const businessCard = filterSearch.map((businessInfo, index) => (
        <div key={index} id="userCard">
            <div id="userImgCardContainer">
                <img 
                    id="userCardImg"
                    src={businessInfo.profile_picture}
                    alt={`${businessInfo.name}`}
                />
            </div>

            <div id="userNameCardContainer">
                <h3>{businessInfo.name}</h3>
            </div>

            <div id="allBusinessInfoGrid">
                <div id="businessInfoCardGrid">
                    <>
                        <h6>⭐️ {businessInfo.averageRating}</h6>
                    </>
                
                    <>
                        <h6>⏱️ {businessInfo.opening_time} - {businessInfo.closing_time}</h6>
                    </>

                    <>
                        <h6>📍 {businessInfo.prefecture.prefecture_name}</h6>
                    </>
                </div>

                <div id="businessInfoCardGrid">
                    {businessInfo.business_types.map(types => (
                        <h6 key={types.id}>👤 {types.registered_type.business_type}</h6>
                    ))}
                </div>
            </div>
        </div>
    ));

    return (
        businessCard
    );
}

export default BusinessAccounts;


