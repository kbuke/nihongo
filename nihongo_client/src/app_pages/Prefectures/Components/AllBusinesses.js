import { useState } from "react"
import "./AllBusinesses.css"


function AllBusinesses({
    copyPrefectureBusinesses,
    prefectureName,
    prefectureBusinesses
}){
    const numberOfBusinesses = copyPrefectureBusinesses.length

    const [businessNumber, setBusinessNumber] = useState(0)
    const [filterButtons, setFilterButtons] = useState("Ratings");

    const numberBusinessPerPg = 10

    const filterBusinesses = filterButtons == "Ratings" ? 
        copyPrefectureBusinesses.sort((a, b) => {
            if (a.averageRating === 'N/A') return 1;
            if (b.averageRating === 'N/A') return -1;
            return b.averageRating - a.averageRating
        })
        :
        copyPrefectureBusinesses.sort((a, b) => b.numberReviews - a.numberReviews)

    let slicedBusinesses = filterBusinesses.slice(0, businessNumber + numberBusinessPerPg)

    const clickMore = () => {
        setBusinessNumber(businessNumber + numberBusinessPerPg)
    }

    const clickLess = () => {
        setBusinessNumber(businessNumber - numberBusinessPerPg)
    }

    console.log(prefectureBusinesses)

    const eachBusiness = prefectureBusinesses.map((business, index) => (
        <div 
            key={index}
            className="prefectureBusinessCard"
        >
            <img 
                className="prefectureBusinessesImg"
                //fill out soon
                src={business.profile_picture.length > 0 ? business.profile_picture[0].picture_route : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
            />
            <h3 className="businessName">
                {business.name}
            </h3>
            <div id="businessInfoGrid">
                <div id="leftBusinessInfo">
                    <h5 id="businessPrefectureInfo">
                        {business.card_info}
                    </h5>
                </div>

                <div id="rightBusinessInfo">
                    <div id="reviewGrid">
                        <h4>
                            {(business.business_reviews.reduce((accumulator, review) => (
                                accumulator + review.review_rating
                            ), 0) / business.business_reviews.length).toFixed(1)} ⭐️
                        </h4>

                        <h4 className="numberReviews">
                            {business.business_reviews.length}
                        </h4>
                    </div>
                </div>
            </div>
            <h5>Registered: {business.date_registered}</h5>
        </div>
    ))

    // const eachBusiness = slicedBusinesses.map((business, index) => (
    //     <div
    //         key={index}
    //         className="prefectureBusinessCard"
    //     >
    //         <img 
    //             className="prefectureBusinessesImg"
    //             alt="prefecture businesses image"
    //             src={business.profile_picture}
    //         />
    //         <h3 className="businessName">{business.name}</h3>
    //         <div id='businessInfoGrid'>
    //             <div id='leftBusinessInfo'>
    //                 <h5 id="businessPrefectureInfo">{business.card_info}</h5>
    //             </div>

    //             <div id='rightBusinessInfo'>
    //                 <div id='reviewGrid'>
    //                     <h4>{business.averageRating} ⭐️ </h4>
    //                     <h4 className="numberReviews">({business.numberReviews})</h4>
    //                 </div>
    //             </div>
    //         </div>
    //         <h5 id="businessRegisterDate">Registered: {business.date_registered.slice(0, 10)}</h5>
    //     </div>
    // ))
    return(
        <div>
            <h2>{`Businesses in ${prefectureName}`}</h2>

            <div id="specificBusinessButtonContainer">
                <button 
                    id="sortRatings"
                    className={filterButtons == "Ratings" ? "selectedCategory" : "sortBusinessButton"}
                    onClick={() => setFilterButtons("Ratings")}
                >
                    Show Highest Rated Businesses
                </button>

                <button 
                    id="sortViews"
                    className={filterButtons == "Views" ? "selectedCategory" : "sortBusinessButton"}
                    onClick={() => setFilterButtons("Views")}
                >
                    Show Most Visited Businesses
                </button>

                <button
                    id="sortDate"
                    className={filterButtons == "Date" ? "selectedCategory" : "sortBusinessButton"}
                    onClick={() => setFilterButtons("Date")}
                >
                    Show Newly Registered Businesses
                </button>
            </div>

            <div className="prefectureBusinessesContainer">
                <div className="prefectureBusinesses">
                    {eachBusiness}
                </div>
                
                <div id="businessButtonsContainer">
                    <div id="businessButtons">
                        {businessNumber <= 0? 
                            null
                            :
                            <button onClick={clickLess}>Previous Businesses</button>
                        }
                
                        {businessNumber + numberBusinessPerPg >= numberOfBusinesses ?
                            null
                            :
                            <button onClick={clickMore}>More Businesses</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBusinesses