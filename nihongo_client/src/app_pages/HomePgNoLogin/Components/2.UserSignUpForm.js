
import "./2.UserSignUpForm.css"
import { useFormik } from "formik"
import * as yup from "yup"
import { useState } from "react"

function UserSignUp({
    users, 
    setUsers,
    setUserSignedUp,
    setSignedUpUserName
}){

    //---------------Set state for new user------------------------
    const [newUserRole, setNewUserRole] = useState("")
    //---------------Set state for if new user selects their type-------------
    const [selectedUserType, setSelectedUserType] = useState(false)

    //State the available account types
    const accountTypes = ["Traveller", "Citizen", "Local Business"]

    const handleButtonClick = (type) => {
        setSelectedUserType(!selectedUserType)
        setNewUserRole(type)
    }

    //Create buttons for available user types
    const typeButtons = accountTypes.map((type, index) => (
        <button 
            key={index}
            className="userSelectButton"
            onClick={() => handleButtonClick(type)}
        >
            {type}
        </button>
    ))
   
    const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

    const formSchema = yup.object().shape({
        newUserName: yup.string()
            .min(5, "Username must be atleast 5 characters long")
            .max(15, "Username can not be longer than 15 characters")
            .required("Must enter a username"),
        newUserInfo: yup.string()
            .min(0, "User Info must be at least 0 characters.")
            .max(250, "User Info must be no longer than 250 characters."),
        newUserPassword: yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password can not be longer than 20 characters.")
            .required("User must enter a new password."),
        newUserPic: yup.string(),
        newUserHomeCountry: yup.string() 
            .oneOf(country_list, "Please enter a valid country"),
        newUserHomeTown: yup.string(),
        newUserCurrentTown: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            newUserName: "",
            newUserInfo: "",
            newUserPassword: "",
            newUserPic: "",
            newUserHomeCountry: "",
            newUserHomeTown: "",
            newUserCurrentTown: "",
            newUserRole: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            values.newUserRole = newUserRole;
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            }).then((res) => {
                if(res.status === 201) {
                    return res.json()
                }
                throw new Error("Failed to create user");
            }).then((newUser) => {
                setUsers([...users, newUser])
                setUserSignedUp(true)
                setSignedUpUserName(values.newUserName);
            })
        }
    })

    //-------------------Set inputs that will be used by all types of users-----------------
    const infoForAll = 
        <>
            <input 
                type="text"
                name="newUserName"
                className="newUserInput"
                value={formik.values.newUserName}
                onChange={formik.handleChange}
                placeholder="Enter your new Username"
            />
            {formik.errors.newUserName && <div className="signUpError">{formik.errors.newUserName}</div>}

            <input 
                type="password"
                name="newUserPassword"
                className="newUserInput"
                value={formik.values.newUserPassword}
                onChange={formik.handleChange}
                placeholder="Enter your new password"
            />
            {formik.errors.newUserPassword && <div className="signUpError">{formik.errors.newUserPassword}</div>}

            <input 
                type="text"
                name="newUserInfo"
                className="newUserInput"
                value={formik.values.newUserInfo}
                onChange={formik.handleChange}
                placeholder="Enter some information about you"
            />
            {formik.errors.newUserInfo && <div className="signUpError">{formik.errors.newUserInfo}</div>}

            <input 
                type="text"
                name="newUserPic"
                className="newUserInput"
                value={formik.values.newUserPic}
                onChange={formik.handleChange}
                placeholder="Upload a user image"
            />
        </>

    let newUser;
    if(newUserRole === "Traveller") {
        newUser = 
        <>
            {infoForAll}

            <select
                className="newUserInput"
                value={formik.values.newUserHomeCountry}
                onChange={formik.handleChange}
                name="newUserHomeCountry"
            >
                <option>Select Home Country</option>
                {country_list.map(country => (
                    <option key={country}>{country}</option>
                ))}
            </select>
            {formik.errors.newUserHomeCountry && <div className="signUpError">{formik.errors.newUserHomeCountry}</div>}
        </>
    }

    else if(newUserRole == "Citizen"){
        newUser =
        <>
            {infoForAll}
        </>
    }

    else if(newUserRole == "Local Business"){
        newUser = 
        <>
            {infoForAll}
        </>
    }

    return (
        <div id="signUpDiv">
            <h1 id="signUpTitle">Sign Up Form</h1>
            {selectedUserType ? 
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <h3 className="signUpTypeInstruction">Please fill out the below to set up a {newUserRole} Account</h3>
                    {newUser}
                    <div id="signUpConfirmButtons">
                        <button id="backButton" onClick={() => setSelectedUserType(false)}>Go Back</button>
                        <button 
                            id="signUpButton"
                            type="submit"
                        >
                            Sign-Up to Nihongo
                        </button>
                    </div>
                </form>
                :
                <div>
                    <h3 className="signUpTypeInstruction">Please choose account type from the below:</h3>
                    {typeButtons}
                </div>
            }
        </div>
    );
}

export default UserSignUp;


 