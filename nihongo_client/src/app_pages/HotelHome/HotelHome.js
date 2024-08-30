import { useOutletContext } from "react-router-dom"

import { useState } from "react"
import { Link } from "react-router-dom"

import "./HotelHome.css"

function HotelHome(){
    const appData = useOutletContext()

    const [hoveredCard, setHoveredCard] = useState()

    const verticalNavHover = appData.verticalNavHover

    const hotelPgContainerStyle = verticalNavHover ?
        {
            marginLeft: "220px",
            width: "calc(100% - 220px)"
        }
        :
        {
            marginLeft: "50px",
            width: "calc(100% - 50px)",
        }

    const allBusinesses = appData.allBusinesses

    const allHotels = allBusinesses.filter(businesses => {
        const businessTypes = businesses.business_types
        const filteredTypes = businessTypes.some(type => (
            type.registered_type.business_type === "Hotel" || type.registered_type.business_type === "Hostel"
        ))
        return filteredTypes
    })
    console.log(allHotels)

    const renderedHotelCards = allHotels.map((hotel, index) => (
        <Link
            key={index}
            className="hotelCard"
            style={{
                backgroundImage: `url(${hotel.profile_picture.picture_route})`
            }}
            to={`/business/${hotel.id}`}
            onMouseEnter={() => setHoveredCard(hotel.name)}
            onMouseLeave={() => setHoveredCard("")}
        >
            {hoveredCard === hotel.name ?
                <div
                    id="selectedCardInfoContainer"
                >
                    <h1
                        id="selectedCardName"
                    >
                        {hotel.name}
                    </h1>

                    <div>
                        {(() => {
                            const totalScore = hotel.business_reviews.reduce((accumulator, review) => {
                                return accumulator + review.review_rating;
                            }, 0);

                            const numberOfReviews = hotel.business_reviews.length;
                            const averageScore = numberOfReviews > 0 ? (totalScore / numberOfReviews).toFixed(1) : "No Reviews";
        
                            return `${averageScore} ⭐️`;
                        })()}
                    </div>


                    <h3
                        id="selectedCardInfo"
                    >
                        {hotel.user_info}
                    </h3>
                </div>
                :
                null
            }
        </Link>
    ))

    console.log(`I am hovering on ${hoveredCard}`)

    return (
        <div
            id="userPgContainer"
            style={hotelPgContainerStyle}
        >
            <h1 id="hotelPgTitle">Hotels Registered on Nihon-Go</h1>

            <div
                id="hotelGrid"
            >
                {renderedHotelCards}
            </div>
        </div>
    )
}
export default HotelHome