import { useEffect, useState } from "react"
import "./BusinessCheckIns.css"

function BusinessCheckIns({
    businessCheckIn,
    specificBusinessId,
    businessName
}){
    console.log(businessCheckIn)
    const [filterBusinessCheckIns, setFilterBusinessCheckIns] = useState([])
    console.log(`this is business ${specificBusinessId}`)

    useEffect(() => {
        setFilterBusinessCheckIns(businessCheckIn.filter(business => business.business_id === specificBusinessId))
    }, [businessCheckIn])

    console.log(filterBusinessCheckIns)

    const renderCheckIns = filterBusinessCheckIns.map((business, index) => (
        <div 
            key={index}
            id="checkInGrid"
        >
            <div id="renderedCheckInImgContainer">
                {business.user.profile_picture.length === 0 ?
                    <img 
                        id="renderedCheckInImg"
                        src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    />
                    :
                    <img 
                        id="renderedCheckInImg"
                        src={business.user.profile_picture? business.user.profile_picture.picture_route : null}
                    />
                }
            </div>
            <div id="checkInInfoBlock">
                <h4 id="checkInInfo">{business.user.username}</h4>
                <h6 id="checkInInfoDate">Checked In: {business.check_in_date.slice(0, 10)}</h6>
            </div>
        </div>
    ))

    return(
        <>
            {renderCheckIns}
        </>
    )
}
export default BusinessCheckIns