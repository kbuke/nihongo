import "./BusinessCheckInWishList.css"

import noCheckInIcon from "../../../assets/unvisitedMark.png"
import checkInIcon from "../../../assets/visitedMark.png"

import noWishListIcon from "../../../assets/emptyTravelBag.png"
import wishListIcon from "../../../assets/fullTravelBag.png"

import { useEffect, useState } from "react"

function BusinessCheckInWishList({
    specificBusinessId,
    loggedUserId,
    userCheckIns,
    businessName,
    userWishList
}) {
    const [allCheckIns, setAllCheckIns] = useState([])
    const [visited, setVisited] = useState(false)
    const [checkInId, setCheckInId] = useState(null)

    const [allWishLists, setAllWishLists] = useState([])
    const [wishList, setWishList] = useState(false)
    const [wishListId, setWishListId] = useState(null)


    useEffect(() => {
        const checkUserCheckedIn = userCheckIns ?
            userCheckIns.filter(checkInInfo => checkInInfo.business_id === specificBusinessId)
            :
            []
        setVisited(checkUserCheckedIn.length > 0)
        setCheckInId(checkUserCheckedIn.length > 0 ? checkUserCheckedIn[0].id : null)
    }, [userCheckIns, specificBusinessId])


    useEffect(() => {
        const checkUserWishList = userWishList ? 
            userWishList.filter(wishListInfo => wishListInfo.business_id === specificBusinessId)
            :
            []
        setWishList(checkUserWishList.length > 0)
        setWishListId(checkUserWishList.length > 0 ? checkUserWishList[0].id : null)
    }, [userWishList, specificBusinessId])

    // Show current check-ins
    useEffect(() => {
        fetch('/businesscheckin')
            .then(r => {
                if (r.ok) {
                    return r.json()
                }
                throw r
            })
            .then(checkIns => setAllCheckIns(checkIns))
            .catch(error => console.error("Error fetching check ins", error))
    }, [])

    //Shwo current wish lists
    useEffect(() => {
        fetch('/businesswishlist')
            .then(r => {
                if(r.ok) {
                    return r.json()
                }
                throw r
            })
            .then(wishlists => setAllWishLists(wishlists))
            .catch(error => console.error("Error fetching wish lists", error))
    }, [])

    //Handle logic for new check in or wishlist addition
    const visitUrl = "/businesscheckin"
    const wishlistUrl = "/businesswishlist"

    const handlePush = (e, setTrue, fetchUrl, setAllCategories, allCategories, setCategory, setCategoryId) => {
        e.preventDefault()
        const jsonData = {
            setTrue, 
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
                setCategory(true)
                setCategoryId(newCategory.id)
            })
    }

    //Handle logic to delete a wishlist or check in
    const specificCheckInUrl = `/businesscheckin/${checkInId}`
    const specificWishListUrl = `/businesswishlist/${wishListId}`

    const handleDelete = (e, specificUrl, setAllCategories, categoryId, setCategory) => {
        e.preventDefault()
        fetch(specificUrl, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllCategories(categories => categories.filter(category => category.id !== categoryId))
                    setCategory(false)
                }
            })
    }


    return (
        <div id="businessCheckInWishListGrid">
            <div id="interactiveContainer">
                {!visited ?
                    <div id="interactiveBlock">
                        <h4>You Have Not Visited {businessName}</h4>
                        <button 
                            id="interactiveButton"
                            onClick={(e) => handlePush(e, {visited: true}, visitUrl, setAllCheckIns, allCheckIns, setVisited, setCheckInId)}
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
                            onClick={(e) => handleDelete(e, specificCheckInUrl, setAllCheckIns, checkInId, setVisited)}
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
                {!wishList?
                    <div id="interactiveBlock">
                        <h4>You Have No Plan to Visit {businessName}</h4>
                        <button
                            id="interactiveButton"
                            onClick={(e) => handlePush(e, {wishList: true}, wishlistUrl, setAllWishLists, allWishLists, setWishList, setWishListId)}
                        >
                            <img 
                                id="interactiveImg"
                                src={noWishListIcon}
                            />
                        </button>
                        <h5>Press Above to Add {businessName} to your Wishlist</h5>
                    </div>
                    :
                    <div id="interactiveBlock">
                        <h4>You Plan to Visit {businessName}</h4>
                        <button
                            id="interactiveButton"
                            onClick={(e) => handleDelete(e, specificWishListUrl, setAllWishLists, wishListId, setWishList)}
                        >
                            <img 
                                id="interactiveImg"
                                src={wishListIcon}
                            />
                        </button>
                        <h5>Press Above to Remove {businessName} from your Wishlist</h5>
                    </div>
                }
            </div>
        </div>
    )
}
export default BusinessCheckInWishList
