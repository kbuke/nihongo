import "./2.UserSignUpForm.css"

function UserSignUp({
    type,
    selectedUserType,
    setSelectedUserType,
    setNewUserRole
}){

    const handleButtonClick = (e) => {
        e.preventDefault()
        setSelectedUserType(!selectedUserType)
        setNewUserRole(type)
    }

    return (
        <div id="userSelectContainer">
            <button 
                className="userSelectButton"
                onClick={handleButtonClick}
            >
                {type}
            </button>
        </div>
    );
}

export default UserSignUp;