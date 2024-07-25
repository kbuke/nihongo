import checkedInIcon from "../../../assets/visitedMark.png"
import noCheckInIcon from "../../../assets/unvisitedMark.png"
import { useEffect, useState } from "react"
import "./PrefectureCheckIn.css"

function PrefectureCheckIn({ loggedUser, specificPrefecture }) {

    const [checkIns, setCheckIns] = useState([])
    const [visited, setVisited] = useState(false)
    const [checkInId, setCheckInId] = useState(null)

    // Check if the specific user has checked in already
    useEffect(() => {
        if (loggedUser && specificPrefecture) {
            const loggedUserVisitedPrefectures = loggedUser.prefecture_visit || [];
            const confirmPrefectureVisit = loggedUserVisitedPrefectures.filter(info => info.prefecture_id === specificPrefecture.id);
            const checkId = confirmPrefectureVisit.length > 0 ? confirmPrefectureVisit[0].id : null;
            setCheckInId(checkId);
            setVisited(confirmPrefectureVisit.length > 0);
        }
    }, [loggedUser, specificPrefecture]);

    // Get all current check-ins
    useEffect(() => {
        fetch('/prefecturecheckin')
            .then(r => {
                if (r.ok) {
                    return r.json();
                }
                throw r;
            })
            .then(checkIns => setCheckIns(checkIns))
            .catch(error => console.error('Error fetching check-ins:', error));
    }, []);

    // Find prefecture id
    const prefectureId = specificPrefecture ? specificPrefecture.id : null;

    // Find user id
    const userId = loggedUser && (loggedUser.role === "Admin" || loggedUser.role === "Citizen" || loggedUser.role === "Traveler") ?
        loggedUser.id : null;

    // Confirm the user's type, only applicable to admins, citizens, and travelers
    const userType = loggedUser && (loggedUser.role === "Admin" || loggedUser.role === "Citizen" || loggedUser.role === "Traveler") ?
        1 : 0;

    // Show a user has visited this prefecture
    const checkIn = (e) => {
        e.preventDefault();
        console.log("adding new check-in");
        setVisited(true);
        const jsonData = {
            visited: true,
            userId,
            prefectureId
        };
        fetch("/prefecturecheckin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then((r) => r.json())
            .then((newCheckIn) => {
                setCheckInId(newCheckIn.id)
                setCheckIns([...checkIns, newCheckIn]);
            })
            .catch(error => console.error('Error during check-in:', error));
    };

    const handleDelete = () => {
        fetch(`/prefecturecheckin/${checkInId}`, {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                setCheckIns((checkIns) => checkIns.filter((checkIn) => checkIn.id !== checkInId));
                setVisited(false);
            }
        })
        .catch(error => console.error('Error during delete:', error));
    };

    // Handle the logic for displaying icons
    const markInOrOut = userType ? (
        !visited ? (
            <div id="interactiveContainer" onClick={checkIn}>
                <button id="interactiveButton" onClick={checkIn}>
                    <img id="interactiveImg" alt="userNotCheckedIn" src={noCheckInIcon} />
                </button>
                <h5>You have not been to {specificPrefecture.prefecture_name}</h5>
                <h6>Click Icon to Check-In</h6>
            </div>
        ) : (
            <div id="interactiveContainer" onClick={handleDelete}>
                <button id="interactiveButton">
                    <img id="interactiveImg" alt="userCheckedIn" src={checkedInIcon} />
                </button>
                <h5>You've been to {specificPrefecture.prefecture_name}</h5>
                <h6>Click Icon To Remove Check-In</h6>
            </div>
        )
    ) : null;

    return (
        markInOrOut
    );
}

export default PrefectureCheckIn;