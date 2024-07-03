import "./LoggedInHome.css"

import HorizontalNavBar from "../NavBars/HorizontalNav"
import VerticalNav from "../NavBars/VerticalNav"

import { useOutletContext } from "react-router-dom"
import { useState } from "react"

function LoggedInHome(){
    //retreive data from App.js
    const appData = useOutletContext()

    //Show logged in user info
    const loggedInUser = appData.loggedUser
    const setLoggedUser = appData.setLoggedUser
    
    const loggedInUserImg = loggedInUser.profile_picture

    const[verticalNavHover, setVerticalNavHover] = useState(false)
    
    return(
        <div>
            <HorizontalNavBar 
                loggedInUserImg={loggedInUserImg}
            />
            <VerticalNav 
                verticalNavHover={verticalNavHover}
                setVerticalNavHover={setVerticalNavHover}
                setLoggedUser={setLoggedUser}
            />
        </div>
    )
}
export default LoggedInHome