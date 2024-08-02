import { useState } from "react"
import "./UserBusinessCheckIns.css"

function UserBusinessCheckIns({
    filterBusinessPrefecture,
    selectedBusiness,
    setSelectedBusiness,
    setSelectedBusinessId
}){
    console.log(filterBusinessPrefecture)
    const [currentPg, setCurrentPg] = useState(0)

    const cardsPerPg = 3

    const businessVists = filterBusinessPrefecture.length

    const sliceBusinesses = filterBusinessPrefecture.slice(currentPg, currentPg + cardsPerPg)

    const setBusinessInfo = (businessName, businessId) => {
        setSelectedBusiness(businessName)
        setSelectedBusinessId(businessId)
    }

    const renderedBusinessCard = sliceBusinesses.map((business, index) => (
        <div  
            key={index}
            id="renderVisitedBusinessesCard"
        >
            <div id="renderVisitedBusinessImgContainer">
                <img 
                    id="renderVisitedBusinessImg"
                    src={business.business.profile_picture}
                />
            </div>
            <h3>{business.business.name}</h3>
            <button 
                onClick={() => setBusinessInfo(business.business.name, business.business.id)}
            >
                {
                    selectedBusiness === business.business.name ?
                        null
                        :
                        "Show More Info"
                }
            </button>
        </div>
    ))

    const renderPrevButtons = currentPg === 0 ?
        null
        :
        <button
            onClick={() => setCurrentPg(currentPg - cardsPerPg)}
        >
            Show Previous
        </button>
    
    const renderNextButton = currentPg + cardsPerPg < businessVists ? 
        <button
            onClick={() => setCurrentPg(currentPg + cardsPerPg)}
        >
            Show More
        </button>
        :
        null

    return(
        <>
            <div id="renderVisitedBusinessesCardContainer">
                {renderedBusinessCard}
            </div>

            <div id="visitedBusinessNextButtons">
                {renderPrevButtons}
                {renderNextButton}
            </div>
        </>
    )
}
export default UserBusinessCheckIns