import { useState } from "react"

import "./UserOptions.css"

import UserPictureFeed from "./UserPictureFeed"
import UserVisits from "./UserVisits"


function UserOptions({
    loggedUser,
    specificUserInfo,
    appData
}){
    const [defaultOption, setDefaultOption] = useState("Pictures")
    const availableUserOptions = ["Pictures", "Visited", "Blogs"]

    const renderOptions = availableUserOptions.map((option, index) => (
        <h1 
            key={index}
            onClick={() => setDefaultOption(option)}
            className="renderedUserFeedOptions"
            id={option === defaultOption ? "selectedUserOptionFeed" : null}
        >
            {option}
        </h1>
    ))

    return(
        <>
            <div id="renderedUserFeedOptionGrid">
                {renderOptions}
            </div>

            {defaultOption === "Pictures" ? 
                <UserPictureFeed 
                    loggedUser={loggedUser}
                    specificUserInfo={specificUserInfo}
                    appData={appData}
                />
                :
                null
            }

            {defaultOption === "Visited" ?
                <UserVisits 
                    specificUserInfo={specificUserInfo}
                    appData={appData}
                    loggedUser={loggedUser}
                />
                :
                null
            }
        </>
    )
}
export default UserOptions