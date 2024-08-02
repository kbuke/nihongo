import "./BusinessCheckInWishList.css"

import noCheckInIcon from "../../../assets/unvisitedMark.png"
import checkInIcon from "../../../assets/visitedMark.png"

import noWishListIcon from "../../../assets/emptyTravelBag.png"
import wishListIcon from "../../../assets/fullTravelBag.png"

function BusinessCheckInWishList({
    specificBusinessId,
    loggedUserId,
    businessName,
    allCheckIns,
    setAllCheckIns,
    allWishLists,
    setAllWishLists
}) {

    const filterUserCheckIns = allCheckIns? allCheckIns.filter(user => user.business_id === specificBusinessId && user.user_id === loggedUserId) : null
    const filterUserWishList = allWishLists? allWishLists.filter(user => user.business_id === specificBusinessId && user.user_id === loggedUserId) : null 

    //Handle logic for creating new wishlist or checkin
    const checkInUrl = "/businesscheckin"
    const wishListUrl = '/businesswishlist'

    const handlePush = (e, fetchUrl, setAllCategories, allCategories) => {
        e.preventDefault()
        const jsonData = {
            loggedUserId,
            specificBusinessId
        }
        fetch(fetchUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newCategory => {
                setAllCategories([...allCategories, newCategory])
            })
    }

    //Handle logic for deleting wishlist or checkin
    const handleDelete = (e, specificUrl, setAllCategories, categoryId) => {
        e.preventDefault()
        fetch(specificUrl, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllCategories(categories => categories.filter(category => category.id !==categoryId))
                }
            })
    }

    return(
        <div id="businessCheckInWishListGrid">
            <div id="interactiveContainer">
                {filterUserCheckIns.length == 0 ?
                    <div id="interactiveBlock">
                        <h4>You Have Not Visited {businessName}</h4>
                        <button 
                            id="interactiveButton"
                            onClick={(e) => handlePush(e, checkInUrl, setAllCheckIns, allCheckIns)}
                        >
                            <img 
                                src={noCheckInIcon}
                                id="interactiveImg"
                            />
                        </button>
                        <h5>Press Above to Mark Visit to {businessName}</h5>
                    </div>
                    :
                    <div id="interactiveBlock">
                        <h4>You Have Visited {businessName}</h4>
                        <button 
                            id="interactiveButton"
                            onClick={(e) => handleDelete(e, `/businesscheckin/${filterUserCheckIns[0].id}`, setAllCheckIns, filterUserCheckIns[0].id)}
                        >
                            <img 
                                src={checkInIcon}
                                id="interactiveImg"
                            />
                        </button>
                        <h5>Press Above to Unmark Visit</h5>
                    </div>
                }
            </div>

            <div id="interactiveContainer">
                {filterUserWishList.length == 0 ?
                    <div id="interactiveBlock">
                        <h4>You Have No Plan to Visit {businessName}</h4>
                        <button
                            id="interactiveButton"
                            onClick={(e) => handlePush(e, wishListUrl, setAllWishLists, allWishLists)}
                        >
                            <img 
                                id="interactiveImg"
                                src={noWishListIcon}
                            />
                        </button>
                        <h5>Press Above to Add {businessName} to your Wishlist</h5>
                    </div>
                    :
                    <div
                        id="interactiveBlock"
                    >
                        <h4>You Plan to Visit {businessName}</h4>
                        <button
                            id="interactiveButton"
                            onClick={(e) => handleDelete(e, `/businesswishlist/${filterUserWishList[0].id}`, setAllWishLists, filterUserWishList[0].id)}
                        >
                            <img 
                                id="interactiveImg"
                                src={wishListIcon}
                            />
                        </button>
                        <h5>Press Above to Remove {businessName} from your WishList</h5>
                    </div>
                }
            </div>
        </div>
    )
}
export default BusinessCheckInWishList
