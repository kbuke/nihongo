import { useEffect, useState } from "react"
import "./BusinessCheckIns.css"

import { Link } from "react-router-dom"

function BusinessCheckIns({
    businessCheckIn,
    specificBusinessId,
    businessName
}){
    console.log(businessCheckIn)
    const [filterBusinessCheckIns, setFilterBusinessCheckIns] = useState([])
    const [pgNumber, setPgNumber] = useState(0)

    const checkInPerPg = 4
    console.log(`this is business ${specificBusinessId}`)

    useEffect(() => {
        setFilterBusinessCheckIns(businessCheckIn.filter(business => business.business_id === specificBusinessId))
    }, [businessCheckIn])

    console.log(filterBusinessCheckIns)

    const sortBusinessCheckIns = filterBusinessCheckIns.sort((a, b) => new Date(b.check_in_date) - new Date(a.check_in_date))

    const numberBusinessCheckIns = sortBusinessCheckIns.length

    const renderedCheckIns = sortBusinessCheckIns.slice(pgNumber, checkInPerPg + pgNumber)

    const renderCheckIns = renderedCheckIns.map((business, index) => (
        <div 
            key={index}
            id="checkInGrid"
        >
            <Link 
                id="renderedCheckInImgContainer"
                to={`/users/${business.user_id}`}
            >
                <img 
                    id="renderedCheckInImg"
                    src={business.user.profile_picture.picture_route}
                />
            </Link>
            <div id="checkInInfoBlock">
                <h4 id="checkInInfo">{business.user.username}</h4>
                <h6 id="checkInInfoDetails">Checked In to {businessName}</h6>
                <h6 id="checkInInfoDate">{business.check_in_date.slice(0, 10)}</h6>
            </div>
        </div>
    ))

    return(
        <>
            {renderCheckIns}

            {numberBusinessCheckIns > checkInPerPg && (
                <div id="wishListButton">
                    {pgNumber > 0 && (
                        <button
                            onClick={() => setPgNumber(pgNumber - checkInPerPg)}
                        >
                            Show Previous
                        </button>
                    )}

                    {numberBusinessCheckIns > checkInPerPg + pgNumber && (
                        <button
                            onClick={() => setPgNumber(pgNumber + checkInPerPg)}
                        >
                            Show Next 
                        </button>
                    )}
                </div>
            )}
        </>
    )
}
export default BusinessCheckIns