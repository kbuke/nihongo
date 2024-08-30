import { useOutletContext } from "react-router-dom"

import { useState } from "react"

import { Link } from "react-router-dom"

import "./SitesHome.css"

function SitesHome(){
    const appData = useOutletContext()

    const [hoveredCard, setHoveredCard] = useState()

    const verticalNavHover = appData.verticalNavHover

    const businessPgContainerStyle = verticalNavHover ?
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
    console.log(allBusinesses)

    const renderedBusinessCards = allBusinesses.map((businesses, index) => (
        <Link
            key={index}
            className="hotelCard"
            style={{
                backgroundImage: `url(${businesses.profile_picture.picture_route})`
            }}
            to={`/business/${businesses.id}`}
            onMouseEnter={() => setHoveredCard(businesses.name)}
            onMouseLeave={() => setHoveredCard("")}
        >
            {hoveredCard === businesses.name ?
                <div
                    id="selectedCardInfoContainer"
                >
                    <h1
                        id="selectedCardName"
                    >
                        {businesses.name}
                    </h1>

                    <div>
                        {(() => {
                            const totalScore = businesses.business_reviews.reduce((accumulator, review) => {
                                return accumulator + review.review_rating;
                            }, 0);

                            const numberOfReviews = businesses.business_reviews.length;
                            const averageScore = numberOfReviews > 0 ? (totalScore / numberOfReviews).toFixed(1) : "No Reviews"

                            return `${averageScore} ⭐️`
                        })()}
                    </div>

                    <h2>📍 {businesses.prefecture.prefecture_name}</h2>
                </div>
                :
                null
            }
        </Link>
    ))

    return (
        <div
            id="userPgContainer"
            style={businessPgContainerStyle}
        >
            <h1 id="hotelPgTitle">All Businesses Registered on Nihon-Go</h1>

            <div
                id="hotelGrid"
            >
                {renderedBusinessCards}
            </div>
        </div>
    )
}
export default SitesHome