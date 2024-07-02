import { useState } from 'react'
import './1.UserSignIn.css'

function UserSignIn({
    setLoggedUser,
    setLoggedInUser,
}){
    //Set state for login info
    const[signInName, setSignInName] = useState("")
    const[signInPassword, setSignInPassword] = useState("")
    const[logInError, setLoginError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({signInName, signInPassword})
        }).then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                setLoginError(true)
            }
        })
        .then((user) => { 
            if(user){
                setLoggedUser(user)
                setLoggedInUser(true)
            }
        })
    }

    return(
        <form id="userSignInForm" onSubmit={handleSubmit}>
            <input 
                id="username"
                placeholder="Enter Username"
                onChange={(e) => setSignInName(e.target.value)}
            />
            <input 
                id="password"
                placeholder="Enter Password"
                type="password"
                onChange={(e) => setSignInPassword(e.target.value)}
            />
            <button id="loginButton" type='submit'>
                Login
            </button>
            {logInError ? 
                <div id="loginError">
                    <h6>Username or Password Incorrect</h6>
                </div>
                :
                null
            }
        </form>
    )
}
export default UserSignIn