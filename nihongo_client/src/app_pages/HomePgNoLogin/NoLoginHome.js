import "./NoLoginHome.css"
import logo from "/Users/kaanbuke/flatIron/phase5_capstone_project/nihongo/nihongo_client/src/assets/logo.png"

import UserSignIn from "./Components/1.UserSignIn"
import UserSignUp from "./Components/2.UserSignUpForm"
import LoggedInHome from "../HomePgLoggedIn/LoggedInHome"

import { useOutletContext } from "react-router-dom"
import { useState } from "react"

function Home(){

    //Retreive data from App.js
    const appData = useOutletContext()
    
    //-------------registered users-------------------
    const users = appData.users
    const setUsers = appData.setUsers

    console.log(users)

    //--------------see if user is signed in
    const loggedUser = appData.loggedUser
    const setLoggedUser = appData.setLoggedUser

    //set states
    const [userSignedUp, setUserSignedUp] = useState(false)
    const [signedUpUserName, setSignedUpUserName] = useState("")
    const [loggedInUser, setLoggedInUser] = useState(false)



    return(
        loggedUser ? 
            <LoggedInHome 
                setLoggedUser={setLoggedUser}
            />
            :
            <div id="noLoginHomePgContainer">
                <div className="homePgBanner">
                    <div className="homePgBannerGrid">
                        <div id="homePgLogoContainer">
                            <img 
                                id="homePgLogo"
                                src={logo}
                            />
                            <h1 id="homePgTitle">Nihon-Go</h1>
                            <UserSignIn 
                                setLoggedUser={setLoggedUser}
                                setLoggedInUser={setLoggedInUser}
                                setSignedUpUserName
                            />
                        </div>
                    </div>
                </div>

                <div id="homeInfoContainer">
                    {userSignedUp ? 
                        <div id="signUpConfirmation">
                            <h3 className="signUpTypeInstruction">
                                Account for {signedUpUserName} created. Please sign in above
                            </h3>
                        </div>
                        :
                        <UserSignUp 
                                users={users}
                                setUsers={setUsers}
                                setUserSignedUp={setUserSignedUp}
                                setSignedUpUserName={setSignedUpUserName}
                        />
                    }
                </div>
            </div>
    )
}
export default Home