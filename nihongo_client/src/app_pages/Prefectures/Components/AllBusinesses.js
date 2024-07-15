import { useState } from "react"
import "./AllBusinesses.css"


function AllBusinesses({
    prefectureBusinesses,
    prefectureName
}){
    const numberOfBusinesses = prefectureBusinesses.length
    const [businessNumber, setBusinessNumber] = useState(0)

    const numberBusinessPerPg = 5

    let slicedBusinesses = prefectureBusinesses.slice(businessNumber, businessNumber + numberBusinessPerPg)

    const clickMore = () => {
        setBusinessNumber(businessNumber + numberBusinessPerPg)
    }

    const clickLess = () => {
        setBusinessNumber(businessNumber - numberBusinessPerPg)
    }

    const eachBusiness = slicedBusinesses.map((business, index) => (
        <div
            key={index}
            className="prefectureBusinessCard"
        >
            <img 
                className="prefectureBusinessesImg"
                alt="prefecture businesses image"
                src={business.profile_picture}
            />
            <h3 className="businessName">{business.name}</h3>
            <ul>
                {business.business_types.map((everyBusiness, idx) => (
                    <li key={idx}>{everyBusiness.registered_type.business_type}</li>
                ))}
            </ul>
        </div>
    ))
    return(
        <div>
            <h2>{`Businesses in ${prefectureName}`}</h2>
            <div className="prefectureBusinessesContainer">
                <div className="prefectureBusinesses">
                    {eachBusiness}
                </div>
                
                <div id="businessButtonsContainer">
                    <div id="businessButtons">
                        {businessNumber <= 0? 
                            null
                            :
                            <button onClick={clickLess}>Previous Businesses</button>
                        }
                
                        {businessNumber + numberBusinessPerPg >= numberOfBusinesses ?
                            null
                            :
                            <button onClick={clickMore}>More Businesses</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBusinesses