import "./BusinessCheckInWishList.css"

import noCheckInIcon from "../../../assets/unvisitedMark.png"
import checkInIcon from "../../../assets/visitedMark.png"
import { useEffect, useState } from "react"

function BusinessCheckInWishList({
    specificBusinessId,
    loggedUserId,
    userCheckIns
}) {
    const [allCheckIns, setAllCheckIns] = useState([])
    const [visited, setVisited] = useState(false)
    const [checkInId, setCheckInId] = useState(null)

    useEffect(() => {
        const checkUserCheckedIn = userCheckIns ?
            userCheckIns.filter(checkInInfo => checkInInfo.business_id === specificBusinessId)
            :
            []
        console.log(checkUserCheckedIn)
        setVisited(checkUserCheckedIn.length > 0)
        setCheckInId(checkUserCheckedIn.length > 0 ? checkUserCheckedIn[0].id : null)
    }, [userCheckIns, specificBusinessId])

    console.log(visited)

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

    // Handle logic for a check-in
    const handleCheckInPush = (e) => {
        e.preventDefault()
        const jsonData = {
            visited: true,
            loggedUserId,
            specificBusinessId
        }
        fetch("/businesscheckin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newCheckIn => {
                setAllCheckIns([...allCheckIns, newCheckIn])
                setVisited(true)
                setCheckInId(newCheckIn.id)
            })
    }

    // Handle logic for deleting a check-in
    const handleCheckInDelete = (e) => {
        e.preventDefault()
        fetch(`/businesscheckin/${checkInId}`, {
            method: "DELETE"
        })
            .then((r) => {
                if (r.ok) {
                    setAllCheckIns((checkIns) => checkIns.filter(checkIn => checkIn.id !== checkInId))
                    setVisited(false)
                }
            })
    }

    return (
        <div id="businessCheckInWishListGrid">
            <div id="businessCheckInContainer">
                {!visited ?
                    <img
                        src={noCheckInIcon}
                        id="businessCheckInIcon"
                        onClick={handleCheckInPush}
                    />
                    :
                    <img
                        src={checkInIcon}
                        id="businessCheckInIcon"
                        onClick={handleCheckInDelete}
                    />
                }
            </div>
        </div>
    )
}
export default BusinessCheckInWishList
