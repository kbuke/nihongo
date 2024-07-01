import './UserSignIn.css'

function UserSignIn(){
    return(
        <form id="userSignInForm">
            <input 
                id="username"
                placeholder="Enter Username"
            />
            <input 
                id="password"
                placeholder="Enter Password"
                type="password"
            />
            <button id="loginButton">
                Login
            </button>
        </form>
    )
}
export default UserSignIn