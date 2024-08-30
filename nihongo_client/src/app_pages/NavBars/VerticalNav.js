import { useState } from "react"
import "./VerticalNav.css"

import { Link } from "react-router-dom"

import signOuticon from "../../assets/signOutIcon.jpg"
import itineraryIcon from "../../assets/itineraryIcon.jpg"
import blogIcon from "../../assets/blogIcon.jpg"
import hotelIcon from "../../assets/hotelIcon.jpg"
import userIcon from "../../assets/userIcon.jpg"
import sitesIcon from "../../assets/sitesIcon.jpg"

import { Navigate } from "react-router-dom"

function VerticalNav({
    verticalNavHover,
    setVerticalNavHover,
    setLoggedUser,
    loggedUser
}){

    const logOut = () => {
        fetch('/logout', {
            method: "DELETE"
        })
        .then((r) => {
            if(r.ok) {
                setLoggedUser(null)
                setVerticalNavHover(false)
            }
        })
    }
    
    return(
        loggedUser?(
            verticalNavHover ? 
                <div
                    id="verticalNavContainerBig"
                    onMouseLeave={() => setVerticalNavHover(!verticalNavHover)}
                >
                    <Link 
                        className="largeIconContainer"
                        to="itineraries"
                    >
                        <img 
                            className="largeIcon"
                            src={itineraryIcon}
                            alt="itinerary icon"
                        />
                        <h3>Itineraries</h3>
                    </Link>

                    <div className="largeIconContainer">
                        <img 
                            className="largeIcon"
                            src={blogIcon} 
                            alt="blog icon"
                        />
                        <h3>Blogs</h3>
                    </div>

                    <Link 
                        className="largeIconContainer"
                        to="/hotelhome"
                    >
                        <img 
                            className="largeIcon"
                            src={hotelIcon} 
                            alt="hotel icon"
                        />
                        <h3>Hotels</h3>
                    </Link>

                    <Link 
                        className="largeIconContainer"
                        to="/userhome"
                    >
                        <img 
                            className="largeIcon"
                            src={userIcon} 
                            alt="user icon"
                        />
                        <h3>Users</h3>
                    </Link>

                    <Link 
                        className="largeIconContainer"
                        to="/siteshome"
                    >
                        <img 
                            className="largeIcon"
                            src={sitesIcon} 
                            alt="sites icon"
                        />
                        <h3>Sites</h3>
                    </Link>

                    <Link 
                        className="largeIconContainer"
                        onClick={logOut}
                        to={"/"}
                    >
                        <img 
                            className="largeIcon"
                            src={signOuticon} 
                            alt="sign out icon"
                        />
                        <h3>Sign Out</h3>
                    </Link>
                </div>

                :

                <div 
                    id="verticalNavContainerSmall"
                    onMouseEnter={() => setVerticalNavHover(!verticalNavHover)}
                >
                        <div className="smallIconContainer">
                            <img 
                                className="smallIcon"
                                src={itineraryIcon}
                                alt="itinerary icon"
                            />
                        </div>

                        <div className="smallIconContainer">
                            <img 
                                className="smallIcon"
                                src={blogIcon} 
                                alt="blog icon"
                            />
                        </div>

                        <div className="smallIconContainer">
                            <img 
                                className="smallIcon"
                                src={hotelIcon} 
                                alt="hotel icon"
                            />
                        </div>

                        <div className="smallIconContainer">
                            <img 
                                className="smallIcon"
                                src={userIcon} 
                                alt="user icon"
                            />
                        </div>

                        <div className="smallIconContainer">
                            <img 
                                className="smallIcon"
                                src={sitesIcon} 
                                alt="sites icon"
                            />
                        </div>

                        <div className="smallIconContainer">
                            <img 
                                className="smallIcon"
                                src={signOuticon} 
                                alt="sign out icon"
                            />
                        </div>
                    </div>
        )
        :
        null   
        )
}
export default VerticalNav