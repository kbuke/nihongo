import "./3.NewUserInput.css"

function NewUserInput({
    setNewUserName,
    setNewUserInfo,
    setNewUserPic,
    newUserRole,
    setNewUserPassword,
    setNewUserHomeTown,
    setNewUserHomeCountry,
    setNewUserCurrentTown,
    backButton
}){
    const chosenType = (newUserRole=="Traveller" ? 
        <>
            <input 
                className="newUserInput"
                type="text"
                onChange={(e) => setNewUserHomeTown(e.target.value)}
                placeholder="Please Enter Your HomeTown"
            />

            <input 
                className="newUserInput"
                type="text"
                onChange={(e) => setNewUserHomeCountry(e.target.value)}
                placeholder="Please Enter Your Home Country"
            />
        </>
        :
        (newUserRole=="Citizen" ? 
            <>
                <input 
                    className="newUserInput"
                    type="text"
                    onChange={(e) => setNewUserHomeTown(e.target.value)}
                    placeholder="Please Enter Your HomeTown"
                />

                <input 
                    className="newUserInput"
                    type="text"
                    onChange={(e) => setNewUserHomeCountry(e.target.value)}
                    placeholder="Please Enter Your Home Country"
                />

                <input
                    className="newUserInput"
                    type="text"
                    onChange={(e) => setNewUserCurrentTown(e.target.value)}
                    placeholder="Please Enter Your Current Town"
                />
            </>
            :
            (newUserRole=="Local Business" ? 
                console.log("hi lb")
                :
                null
            )
        )
    )


    return(
        <div id="newUserInfo">
            <>
                <input 
                    className="newUserInput"
                    type="text"
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Enter new username"
                />

                <input 
                    className="newUserInput"
                    type="password"
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Enter new password"
                />

                <input 
                    className="newUserInput"
                    type="text"
                    onChange={(e) => setNewUserInfo(e.target.value)}
                    placeholder="Please write a quick bio about you."
                />

                <input 
                    className="newUserInput"
                    type="text"
                    onChange={(e) => setNewUserPic(e.target.value)}
                    placeholder="Please upload new profile picture"
                />

                {chosenType}
            </>

            <div id="signUpConfirmButtons">
                <button id="backButton" onClick={backButton}>Go Back</button>
                <button 
                    id="signUpButton"
                    type="submit"
                >
                    Sign-Up to Nihongo
                </button>
            </div>
        </div>
    )
}
export default NewUserInput