import { useState } from "react"
import "./UserPrefectureBusiness.css"

import UserBusinessRelation from "./UserBusinessRelation"

function UserPrefectureBusiness({
    filterBusinesses,
    specificUserInfo,
    appData
}){
    console.log(filterBusinesses)

    const [selectedBusiness, setSelectedBusiness] = useState(false)
    const [selectedBusinessId, setSelectedBusinessId] = useState()

    const handleBusinessChoice = (businessId) => {
        setSelectedBusiness(true)
        setSelectedBusinessId(businessId)
    }
    console.log(selectedBusiness)

    const renderBusinessCards = filterBusinesses.map((business, index) => (
        <div 
            key={index}
            id="renderBusinessCard"
            style={{backgroundImage: `url(${business.business.profile_picture?.picture_route})`}}
        >
            <div 
                id="renderBusinessCardImgContainer"
                onClick={() => handleBusinessChoice(business.business_id)}
            >
                <div id="renderBusinessCardNameContainer">
                    <h2 id="renderBusinessCardName">{business.business.name}</h2>
                </div>
            </div>
        </div>
    ))
    return(
        <div id="renderedUserBusinessContainer">
            <div
                id="renderedUserBusinessGrid"
            >
                {renderBusinessCards}
            </div>

            {selectedBusiness ?
                <UserBusinessRelation 
                    selectedBusinessId={selectedBusinessId}
                    specificUserInfo={specificUserInfo}
                    appData={appData}
                />
                :
                null
            }
        </div>
    )
}
export default UserPrefectureBusiness