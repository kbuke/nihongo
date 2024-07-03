import { useState } from "react"
import "./VerticalNav.css"

function VerticalNav({
    verticalNavHover,
    setVerticalNavHover,
    setLoggedUser
}){

    const logOut = () => {
        fetch('/logout', {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok) {
                setLoggedUser(null)
            }
        })
    }
    
    return(
       verticalNavHover ? 
            <div
                id="verticalNavContainerBig"
                onMouseLeave={() => setVerticalNavHover(!verticalNavHover)}
            >
                <div className="iconLargeContainer">
                    <h3 className="iconLarge">🎒</h3>
                    <h3 className="iconText">Planned Trips</h3>
                </div>

                <div className="iconLargeContainer"
                    onClick={logOut}
                >
                    <h3 className="iconLarge">👈</h3>
                    <h3 className="iconText">Sign Out</h3>
                </div>
            </div>
            :
            <div 
                id="verticalNavContainerSmall"
                onMouseEnter={() => setVerticalNavHover(!verticalNavHover)}
            >
                <div id="tripIconSmallContainer">
                    <h3 id="tripIconSmall">🎒</h3>
                </div>
            </div>
    )
}
export default VerticalNav