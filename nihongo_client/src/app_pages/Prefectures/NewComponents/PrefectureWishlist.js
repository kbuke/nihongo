import { useEffect, useState } from "react"

import noWishListIcon from "../../../assets/emptyTravelBag.png"
import wishListIcon from "../../../assets/fullTravelBag.png"


function PrefectureWishLists({
    appData,
    loggedUser,
    specificPrefectureId
}){
    const [filterWishLists, setFilterWishLists] = useState()

    const userId = loggedUser.id

    const allPrefectureWishLists = appData.allPrefectureWishLists
    const setAllPrefectureWishLists = appData.setAllPrefectureWishLists

    console.log(allPrefectureWishLists)

    useEffect(() => (
        setFilterWishLists(allPrefectureWishLists.filter(prefectures => prefectures.user_id === userId && prefectures.prefecture_id === specificPrefectureId))
    ), [allPrefectureWishLists])

    console.log(filterWishLists)

    //Handle adding new wishlist
    const handlePush = (e) => {
        e.preventDefault()
        const jsonData = {
            userId,
            specificPrefectureId
        }
        fetch("/prefecturewishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newWishList => {
                setAllPrefectureWishLists([...allPrefectureWishLists, newWishList])
            })
            .catch(error => console.error("Error during wish list", error))
    }

    //Handle delete from wishlist
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/prefecturewishlist/${filterWishLists[0]?.id}`, {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok) {
                setAllPrefectureWishLists(wishLists => wishLists.filter(wishList => wishList.id !== filterWishLists[0].id))
            }
        })
    }

    return(
        filterWishLists?.length > 0 ?
            <div
                id="checkInOutIconContainer"
            >
                <img 
                    id="checkInOutIconImg"
                    src={wishListIcon}
                    onClick={handleDelete}
                />
            </div>
            :
            <div
                id="checkInOutIconContainer"
            >
                <img 
                    id="checkInOutIconImg"
                    src={noWishListIcon}
                    onClick={handlePush}
                />
            </div>
    )




}
export default PrefectureWishLists