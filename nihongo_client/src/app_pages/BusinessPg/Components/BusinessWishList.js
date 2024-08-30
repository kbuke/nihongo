import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BusinessWishList.css";

function BusinessWishList({ allWishLists, specificBusinessId, businessName }) {
    const [filterBusinessWishList, setBusinessWishlist] = useState([]);
    const [pgNumber, setPgNumber] = useState(0);

    const wishListPerPg = 4;

    useEffect(() => {
        setBusinessWishlist(allWishLists.filter(business => business.business_id === specificBusinessId));
    }, [allWishLists, specificBusinessId]);

    const sortWishList = filterBusinessWishList.sort((a, b) => new Date(b.wishlist_date) - new Date(a.wishlist_date));

    const numberOfWishLists = sortWishList.length;
    console.log(`There are ${numberOfWishLists} people`);

    const renderWishLists = sortWishList.slice(pgNumber, wishListPerPg + pgNumber);

    const renderWishList = renderWishLists.map((business, index) => (
        <div key={index} id="checkInGrid">
            <Link to={`/users/${business.user_id}`} id="renderedCheckInImgContainer">
                {business.user.profile_picture.length === 0 ?
                    <img 
                        id="renderedCheckInImg"
                        src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                        alt="default profile"
                    />
                    :
                    <img 
                        id="renderedCheckInImg"
                        src={business.user.profile_picture ? business.user.profile_picture.picture_route : null}
                        alt="user profile"
                    />
                }
            </Link>
            <div id="checkInInfoBlock">
                <h4 id="wishListName">{business.user.username}</h4>
                <h5 id="wishListConfirm">added {businessName} to their wishlist</h5>
                <h6 id="wishListDate">{business.wishlist_date.slice(0, 10)}</h6>
            </div>
        </div>
    ));

    return (
        <>
            {renderWishList}

            {numberOfWishLists > wishListPerPg && (
                <div id="wishListButton">
                    {pgNumber > 0 && (
                        <button
                            onClick={() => setPgNumber(pgNumber - wishListPerPg)}
                        >
                            Show Previous
                        </button>
                    )}
                    
                    {numberOfWishLists > wishListPerPg + pgNumber && (
                        <button
                            onClick={() => setPgNumber(pgNumber + wishListPerPg)}
                        >
                            Show Next
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export default BusinessWishList;
