import "./Home.css"
import logo from "../../assets/logo.png"

import UserSignIn from "./HomeComponents/UserSignIn"
import UserSignUp from "./HomeComponents/2.UserSignUpForm"
import NewUserInput from "./HomeComponents/3.NewUserInput"

import { useOutletContext } from "react-router-dom"
import { useState } from "react"

function Home(){

    //Retreive data from App.js
    const appData = useOutletContext()
    
    //-------------registered users-------------------
    const users = appData.users
    const setUsers = appData.setUsers

    //set states
    const [selectedUserType, setSelectedUserType] = useState(false)

    //-------------handle user sign up----------------
    const [newUserName, setNewUserName] = useState("")
    const [newUserInfo, setNewUserInfo] = useState("")
    const [newUserPic, setNewUserPic] = useState("")
    const [newUserRole, setNewUserRole] = useState("")
    const [newUserPassword, setNewUserPassword] = useState("")
    const [newUserHomeTown, setNewUserHomeTown] = useState("")
    const [newUserHomeCountry, setNewUserHomeCountry] = useState("")
    const [newUserCurrentTown, setNewUserCurrentTown] = useState("")


    //Handle States
    const backButton = (e) => {
        e.preventDefault()
        setSelectedUserType(!selectedUserType)
    }

    //State the available account types
    const accountTypes = ["Traveller", "Citizen", "Local Business"]

    const availableTypes = accountTypes.map((type, index) => (
        <div key={index}>
            <UserSignUp 
                type={type}
                selectedUserType={selectedUserType}
                setSelectedUserType={setSelectedUserType}
                setNewUserRole={setNewUserRole}
            />
        </div>
    ))

    //Sort logged users info
    let newUser;

    if (newUserRole === "Traveller") {
        newUser = {
            newUserName: newUserName,
            newUserInfo: newUserInfo,
            newUserPic: newUserPic,
            newUserRole: newUserRole,
            newUserPassword: newUserPassword,
            newUserHomeCountry: newUserHomeCountry,
            newUserHomeTown: newUserHomeTown
        };
    } else if (newUserRole === "Citizen") {
        newUser = {
            newUserName: newUserName,
            newUserInfo: newUserInfo,
            newUserPic: newUserPic,
            newUserRole: newUserRole,
            newUserPassword: newUserPassword,
            newUserHomeCountry: newUserHomeCountry,
            newUserHomeTown: newUserHomeTown,
            newUserCurrentTown: newUserCurrentTown
        };
    } else {
        newUser = null;
    }

    //Handle the sign up form 
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then((r) => {
            return r.json()
        })
        .then((newUser) => {
            console.log(newUser)
            setUsers([...users, newUser])
        })
    }

    return(
        <div id="homePgContainer">
            <div className="homePgBanner">
                <div className="homePgBannerGrid">
                    <div id="homePgLogoContainer">
                        <img 
                            id="homePgLogo"
                            src={logo}
                        />
                        <h1 id="homePgTitle">Nihon-Go</h1>
                        <UserSignIn />
                    </div>
                </div>
            </div>

            <div id="homeInfoContainer">
                <form 
                    id="signUpForm"
                    onSubmit={handleSubmit}
                >
                    <h1 id="signUpTitle">Sign Up Form</h1>
                    {selectedUserType ? 
                        <h3 className="signUpTypeInstruction">Please fill out the below to set up a {newUserRole} Account</h3>
                        :
                        <h3 className="signUpTypeInstruction">Please choose account type from the below:</h3>
                    }
                    {selectedUserType ? 
                        <NewUserInput 
                            setNewUserName={setNewUserName}
                            setNewUserInfo={setNewUserInfo}
                            setNewUserPic={setNewUserPic}
                            newUserRole={newUserRole}
                            setNewUserPassword={setNewUserPassword}
                            setNewUserHomeTown={setNewUserHomeTown}
                            setNewUserHomeCountry={setNewUserHomeCountry}
                            setNewUserCurrentTown={setNewUserCurrentTown}
                            backButton={backButton}
                        />
                        :
                        availableTypes
                    }
                </form>
            </div>

            <div className="homePgBannerBottom">
            </div>
        </div>
    )
}
export default Home