import checkedInIcon from "../../../assets/visitedMark.png"
import noCheckInIcon from "../../../assets/unvisitedMark.png"
import emptyBag from "../../../assets/emptyTravelBag.png"
import fullBag from "../../../assets/fullTravelBag.png"

import { useEffect, useState } from "react"
import "./PrefectureCheckIn.css"


function PrefectureCheckIn({ 
    loggedUser, 
    specificPrefecture,
    allPrefectureCheckIns,
    setAllPrefectureCheckIns,
    allPrefectureWishLists,
    setAllPrefectureWishLists
}) {

    const prefectureId = specificPrefecture.id 
    const userId = loggedUser.id

    const filterUserCheckIn = allPrefectureCheckIns ? allPrefectureCheckIns.filter(visit => visit.prefecture_id === prefectureId && visit.user_id === userId) : null
    const filterUserWishList = allPrefectureWishLists ? allPrefectureWishLists.filter(wishlist => wishlist.prefecture_id === prefectureId && wishlist.user_id === userId) : null

    const checkInUrl = '/prefecturecheckin'
    const wishListUrl = '/prefecturewishlist'

    const handlePush = (e, url, setAllCategory, allCategory) => {
        e.preventDefault()
        const jsonData = {
            userId,
            prefectureId
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newCategory => {
                setAllCategory([...allCategory, newCategory])
            })
            .catch(error => console.error("Error during check in", error))
    }

    const handleDelete = (e, specificUrl, setAllCategories, categoryId) => {
        e.preventDefault()
        fetch(specificUrl, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllCategories(categories => categories.filter(category => category.id !== categoryId))
                }
            })
    }

    return(
        <>
            <div id="interactiveContainer">
                {filterUserCheckIn.length === 0 ?
                    <div id="interactiveBlock">
                        <button 
                            id="interactiveButton"
                            onClick={(e) => handlePush(e, checkInUrl, setAllPrefectureCheckIns, allPrefectureCheckIns)}
                        >
                            <img 
                                id="interactiveImg"
                                alt="userNotCheckedInImg"
                                src={noCheckInIcon}
                            />
                        </button>
                        <h5>You have not been to {specificPrefecture.prefecture_name}</h5>
                        <h6>Click Icon to Check-In</h6>
                    </div>
                    :
                    <div id="interactiveBlock">
                        <button 
                            id="interactiveButton"
                            onClick={(e) => handleDelete(e, `/prefecturecheckin/${filterUserCheckIn[0].id}`, setAllPrefectureCheckIns, filterUserCheckIn[0].id)}
                        >
                            <img 
                                id="interactiveImg"
                                alt="userCheckedIn"
                                src={checkedInIcon}
                            />
                        </button>
                        <h5>You've been to {specificPrefecture.prefecture_name}</h5>
                        <h6>Click Icon To Remove Check-In</h6>
                    </div>
                }
            </div>

            <div id="interactiveContainer">
                {filterUserWishList.length === 0 ?
                    <div id="interactiveBlock">
                        <button
                            id="interactiveButton"
                            onClick={(e) => handlePush(e, wishListUrl, setAllPrefectureWishLists, allPrefectureWishLists)}
                        >
                            <img 
                                id="interactiveImg"
                                src={emptyBag}
                                alt="empty bag img"
                            />
                        </button>
                        <h5>{specificPrefecture.prefecture_name} is not in your travel list</h5>
                        <h6>Click Bag to add it to the list</h6>
                    </div>
                    :
                    <div id="interactiveBlock">
                        <button
                            id="interactiveButton"
                            onClick={(e) => handleDelete(e, `/prefecturewishlist/${filterUserWishList[0].id}`, setAllPrefectureWishLists, filterUserWishList[0].id)}
                        >
                            <img 
                                id="interactiveImg"
                                src={fullBag}
                                alt="full bag img"
                            />
                        </button>
                        <h5>{specificPrefecture.prefecture_name} is in your travel list</h5>
                        <h6>Click Bag to remove it from list</h6>
                    </div>
                }
            </div>
        </>
    )
}

export default PrefectureCheckIn;