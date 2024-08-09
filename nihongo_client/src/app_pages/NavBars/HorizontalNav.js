import "./HorizontalNav.css"
import logo from "../../assets/logo.png"

import { NavLink } from "react-router-dom"

function HorizontalNavBar({
    loggedUser,
    loggedInUserImg
}){
    console.log(loggedUser)
    return(
        loggedUser? 
            <div id="horizontalNav">
                <NavLink>
                    <div id="loggedLogoContainer">
                        <img 
                            id="loggedLogo"
                            src={logo}
                            alt="nihongoLogo"
                        />
                    </div>
                </NavLink>

                <div id="titleContainer">
                    <h1 id="title">Nihon-Go</h1>
                </div>

                <NavLink 
                    id="loggedUserImgContainer"
                    to={`user/${loggedUser.id}`}
                >
                    {loggedUser ? 
                        <img 
                            id="loggedUserImg"
                            src={loggedUser.profile_picture[0].picture_route}
                            alt="loggedUserImg"
                        />
                        :
                        null
                    }
                </NavLink>
            </div>
            :
            null
    )
}
export default HorizontalNavBar