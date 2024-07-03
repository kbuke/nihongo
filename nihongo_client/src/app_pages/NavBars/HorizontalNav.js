import "./HorizontalNav.css"
import logo from "../../assets/logo.png"

import { NavLink } from "react-router-dom"

function HorizontalNavBar({
    loggedInUserImg
}){
    return(
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

            <div id="searchBarContainer">
                <input 
                    id="searchBar"
                    placeholder="🔎 Search Nihon-Go"
                />
            </div>

            <div id="loggedUserImgContainer">
                <img 
                    id="loggedUserImg"
                    src={loggedInUserImg}
                    alt="loggedUserImg"
                />
            </div>
        </div>
    )
}
export default HorizontalNavBar