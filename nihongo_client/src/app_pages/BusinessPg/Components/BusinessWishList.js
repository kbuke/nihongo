import { useEffect, useState } from "react"


function BusinessWishList({
    allWishLists,
    specificBusinessId,
    businessName
}){
    const [filterBusinessWishList, setBusinessWishlist] = useState([])

    useEffect(() => {
        setBusinessWishlist(allWishLists.filter(business => business.business_id === specificBusinessId))
    }, [allWishLists])

    console.log(filterBusinessWishList)

    const renderWishList = filterBusinessWishList.map((business, index) => (
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
                <h4>{business.user.username} added {businessName} to their wishlist</h4>
            </div>
        </div>
    ))
    
    return(
        <>
            {renderWishList}
        </>
    )
}
export default BusinessWishList