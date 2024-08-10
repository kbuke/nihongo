import { useOutletContext } from "react-router-dom";
import "./Itineraries.css";
import { useState } from "react";

import { Link } from "react-router-dom";

function Itineraries() {
    console.log("welcome to itinerary page");

    const appData = useOutletContext();

    const [currentPg, setCurrentPg] = useState({}); // Track page for each prefecture

    const wishListNumber = 3;

    const verticalNavHover = appData.verticalNavHover;

    const handleNextPg = (prefectureId) => {
        setCurrentPg((prev) => ({
            ...prev,
            [prefectureId]: (prev[prefectureId] || 0) + 1,
        }));
    };

    const handlePrevPg = (prefectureId) => {
        setCurrentPg((prev) => ({
            ...prev,
            [prefectureId]: (prev[prefectureId] || 0) - 1,
        }));
    };

    // Decide the page style
    const itineraryPgContainerStyle = verticalNavHover
        ? {
              marginLeft: "220px",
              width: "calc(100% - 220px)",
          }
        : {
              marginLeft: "50px",
              width: "calc(100% - 50px)",
          };

    // Check logged users info
    const loggedUserInfo = appData.loggedUser;

    const userPrefectureWishList = loggedUserInfo?.prefecture_wishlist || [];

    const allBusinessWishLists = appData.businessWishlist;
    const filterBusinessWishList = (prefectureId) =>
        allBusinessWishLists.filter(
            (business) => business.user_id === loggedUserInfo.id && business.business.prefecture_id === prefectureId
        );

    const renderedWishLists = userPrefectureWishList.map((prefecture, index) => {
        const prefectureId = prefecture.prefecture_id;
        const businesses = filterBusinessWishList(prefectureId);

        const page = currentPg[prefectureId] || 0;
        const paginatedBusinesses = businesses.slice(page * wishListNumber, (page + 1) * wishListNumber);
        console.log(paginatedBusinesses)

        return (
            <div key={index} id="wishlistContainer">
                <div
                    id="prefectureWishListCover"
                    style={{
                        backgroundImage: `url(${prefecture.prefecture.prefecture_img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        borderTopLeftRadius: "24px",
                        borderTopRightRadius: "24px",
                        marginLeft: "10px",
                        height: "450px",
                    }}
                >
                    <h1 id="prefectureNameWishlist">
                        {prefecture.prefecture.prefecture_name}
                    </h1>

                    <div id="businessWishList">
                        {paginatedBusinesses.map((business, index) => (
                            <Link 
                                key={index} 
                                id="businessWishListGrid"
                                to={`/business/${business.business_id}`}
                            >
                                <div id="businessWishListContainer">
                                    <img
                                        id="businessWishlistImg"
                                        src={business.business.profile_picture[0]?.picture_route}
                                        alt="Business"
                                    />
                                </div>
                                <h4 id="businesWishListTitle">
                                    {business.business.name}
                                </h4>
                            </Link>
                        ))}
                        <div id="itineraryButtonGrid">
                            {page > 0 && (
                                <button onClick={() => handlePrevPg(prefectureId)}>
                                    Show Previous
                                </button>
                            )}
                            {businesses.length > (page + 1) * wishListNumber && (
                                <button onClick={() => handleNextPg(prefectureId)}>
                                    Show Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div style={itineraryPgContainerStyle} id="itineraryPgContainer">
            {renderedWishLists}
        </div>
    );
}

export default Itineraries;
