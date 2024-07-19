import { useEffect, useState } from "react"
import emptyBag from "../../../assets/emptyTravelBag.png"
import fullBag from "../../../assets/fullTravelBag.png"

function PrefectureBag({
    loggedUser,
    specificPrefecture
}){

    //See if user has a wishlist
    const userWishList = loggedUser.prefecture_wishlist || []

    //Filter wishlists to see if it matches current prefecture
    const filterWishList = userWishList.length == 0?
        null
        :
        userWishList.filter(list => list.prefecture_id == specificPrefecture.id)


    const wishList = filterWishList && filterWishList.length > 0 ? filterWishList[0].wish_list : false;

    const[wishlists, setWishLists] = useState([])
    const[inBag, setInBag] = useState(wishList)
    const[wishListId, setWishListId] = useState(null)

    const userId = loggedUser.id
    const prefectureId = specificPrefecture.id


    //Check to see type of user (business can not use this function)
    const userType = loggedUser && (loggedUser.role === "Admin" || loggedUser.role === "Citizen" || loggedUser.role === "Traveler") ?
        1 : 0;

    //Show current wishlists for post requests
    useEffect(() => {
        fetch('/prefecturewishlist')
            .then(r => {
                if(r.ok) {
                    return r.json()
                }
                throw r
            })
            .then(wishLists => setWishLists(wishLists))
            .catch(error => console.error("Error fetching wishlists", error))
    }, [])

    
    //Handle new wishlist
    const handlePost = (e) => {
        e.preventDefault()
        const jsonData = {
            inBag: true,
            userId, 
            prefectureId
        }
        fetch("/prefecturewishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then((r) => r.json())
        .then((newWishList) => {
            setWishLists([...wishlists, newWishList])
            setInBag(true)
            setWishListId(newWishList.id)
        })
    }

    //Delete current wishlist
    const handleDelete = () => {
        fetch(`/prefecturewishlist/${wishListId}`, {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok){
                setWishLists((wishlists) => wishlists.filter((wishlist) => wishlist.id !== wishListId))
                setInBag(false)
            }
        })
    }

    const renderBag = userType?(
        inBag? (
            <div 
                id="interactivePrefectureContainer"
                onClick={handleDelete}
            >
                <button id="interactivePrefectureButton">
                    <img 
                        id="interactivePrefectureImg"
                        src={fullBag}
                        alt="fullBag"
                    />
                </button>
                <h5>{specificPrefecture.prefecture_name} is in your travel list</h5>
                <h6>Click Bag to remove it from list</h6>
            </div>
        )
        :
        (
            <div 
                id="interactivePrefectureContainer"
                onClick={handlePost}
            >
                <button id="interactivePrefectureButton">
                    <img
                        id="interactivePrefectureImg"
                        src={emptyBag}
                        alt="emptyBag"  
                    />
                </button>
                <h5>{specificPrefecture.prefecture_name} is not in your travel list</h5>
                <h6>Click Bag to add it to the list</h6>
            </div>
        )
    )
    :
    null

    return(
        renderBag
    )
    
    
}
export default PrefectureBag

// #interactivePrefectureContainer
// #interactivePrefectureButton
// #interactivePrefectureImg
