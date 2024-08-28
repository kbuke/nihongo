import visitIcon from "../../../assets/visitedMark.png"
import noVisitIcon from "../../../assets/unvisitedMark.png"
import { useEffect, useState } from "react"

import "./PrefectureCheckIn.css"

function PrefectureCheckIn({
    appData,
    loggedUser,
    specificPrefectureId
}){
    const [filterPrefectureCheckIn, setFilterPrefectureCheckIn] = useState()
    const userId = loggedUser.id 
    console.log(`I am user ${userId} visiting prefecture ${specificPrefectureId}`)

    const allPrefectureCheckIns = appData.allPrefectureCheckIns
    const setAllPrefectureCheckIns = appData.setAllPrefectureCheckIns

    console.log(allPrefectureCheckIns)

    useEffect(() => {
        setFilterPrefectureCheckIn(allPrefectureCheckIns.filter(prefecture => prefecture.user_id === userId && prefecture.prefecture_id === specificPrefectureId))
    }, [allPrefectureCheckIns])

    //Handle new check in
    const handlePush = (e) => {
        e.preventDefault()
        const jsonData = {
            userId,
            specificPrefectureId
        }
        fetch("/prefecturecheckin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newCheckIn => {
                setAllPrefectureCheckIns([...allPrefectureCheckIns, newCheckIn])
            })
            .catch(error => console.error("Error during check in", error))
    }

    //Handle check out
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/prefecturecheckin/${filterPrefectureCheckIn[0]?.id}`, {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok) {
                setAllPrefectureCheckIns(checkIns => checkIns.filter(checkIn => checkIn.id !== filterPrefectureCheckIn[0].id))
            }
        })
    }

    console.log(filterPrefectureCheckIn)

    return(
        filterPrefectureCheckIn?.length > 0 ?
            <div
                id="checkInOutIconContainer"
            >
                <img 
                    id="checkInOutIconImg"
                    src={visitIcon}
                    onClick={handleDelete}
                />
            </div>
            :
            <div
                id="checkInOutIconContainer"
            >
                <img 
                    id="checkInOutIconImg"
                    src={noVisitIcon}
                    onClick={handlePush}
                />
            </div>
    )


}
export default PrefectureCheckIn