import "./UpdateUserInfo.css"
import { useState } from "react"

function UpdateUserInfo({
    userInfo,
    userHomeTown,
    userHomeCountry,
    userCurrentCountry,
    userCurrentTown,
    userCoverPhoto,
    specificUserProfileId,
    allUsers,
    setAllUsers,
    setUpdateInfo
}){
    console.log(specificUserProfileId)
    console.log(userInfo)
    const [specificUserInfo, setUserInfo] = useState(userInfo)
    const [specificUserHomeTown, setUserHomeTown] = useState(userHomeTown)
    const [specificUserHomeCountry, setUserHomeCountry] = useState(userHomeCountry)
    const [specificUserCurrentTown, setUserCurrentTown] = useState(userCurrentTown)
    const [specificUserCurrentCountry, setUserCurrentCountry] = useState(userCurrentCountry)
    const [specificUserCoverPhoto, setUserCoverPhoto] = useState(userCoverPhoto)

    console.log(specificUserInfo)

    const handlePatch = (e) => {
        e.preventDefault();
        fetch(`/users/${specificUserProfileId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_info: specificUserInfo,
                cover_photo: specificUserCoverPhoto,
                hometown: specificUserHomeTown,
                home_country: specificUserHomeCountry,
                current_town: specificUserCurrentTown,
                current_country: specificUserCurrentCountry
            })
        })
        .then((r) => {
            if(r.ok) {
                return r.json();
            } else {
                console.error("Failed to update info");
                return null; 
            }
        })
        .then((newUserInfo) => {
            if(newUserInfo) {
                setAllUsers(allUsers.map(oldUserInfo => 
                    oldUserInfo.id === newUserInfo.id ? newUserInfo : oldUserInfo
                ));
                setUpdateInfo(false);  // Ensure this is called only after updating the state
            }
        })
        .catch(error => console.error('Error:', error));
    }
    

    return(
        <form
            id="updateUserInfoModal"
            onSubmit={handlePatch}
        >
            <h1>Update User Info</h1>

            <div id="updatingUserInfoGrid">
                <h3>Update User Info</h3>
                <input 
                    defaultValue={userInfo}
                    onChange={(e) => setUserInfo(e.target.value)}
                />
            </div>

            <div
                id="updatingUserInfoGrid"
            >
                <h3>Update Users Cover Photo</h3>
                <input 
                    placeholder="Enter URL of new cover-photo"
                    onChange={(e) => setUserCoverPhoto(e.target.value)}
                />
            </div>

            <div
                id="updatingUserInfoGrid"
            >
                <h3>Update Users Home Town</h3>
                <input 
                    defaultValue={userHomeTown}
                    onChange={(e) => setUserHomeTown(e.target.value)}
                />
            </div>

            <div
                id="updatingUserInfoGrid"
            >
                <h3>Update Users Home Country</h3>
                <input 
                    defaultValue={userHomeCountry}
                    onChange={(e) => setUserHomeCountry(e.target.value)}
                />
            </div>

            <div
                id="updatingUserInfoGrid"
            >
                <h3>Update Users Current Town</h3>
                <input 
                    defaultValue={userCurrentTown}
                    onChange={(e) => setUserCurrentTown(e.target.value)}
                />
            </div>

            <div
                id="updatingUserInfoGrid"
            >
                <h3>Update Users Current Country</h3>
                <input 
                    defaultValue={userCurrentCountry}
                    onChange={(e) => setUserCurrentCountry(e.target.value)}
                />
            </div>

            <div id="updateUserInfoButtonsContainer">
                <button
                    type="submit"
                >
                    Make Changes
                </button>

                <button
                    onClick={() => setUpdateInfo(false)}
                >
                    Cancel Changes
                </button>
            </div>
        </form>
    )
}
export default UpdateUserInfo