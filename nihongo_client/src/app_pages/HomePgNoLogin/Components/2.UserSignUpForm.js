
import "./2.UserSignUpForm.css"
import { useFormik } from "formik"
import * as yup from "yup"
import { useState } from "react"

import BusinessAddress from "./3.BusinessAddress"
import { useOutletContext } from "react-router-dom"

function UserSignUp({
    users, 
    setUsers,
    setUserSignedUp,
    setSignedUpUserName
}){
    const [newUserRole, setNewUserRole] = useState("")

    const [selectedUserType, setSelectedUserType] = useState(false)

    const [businessSignUpPg, setBusinessSignUpPg] = useState(1)

    const [businessPrefectureId, setBusinessPrefectureId] = useState()
    console.log(`I have selected prefecture ${businessPrefectureId}`)

    const accountTypes = ["Traveller", "Citizen", "Local Business"]

    const appData = useOutletContext()

    const allPrefectures = appData.prefectures

    const handleButtonClick = (type) => {
        setSelectedUserType(!selectedUserType)
        setNewUserRole(type)
    }

    console.log(`I am signing up as a new ${newUserRole}`)

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

    const handlePrefectureChange = (event) => {
        const selectedPrefectureId = allPrefectures.find(prefecture => prefecture.prefecture_name === event.target.value).id;
        setBusinessPrefectureId(selectedPrefectureId);
        formik.setFieldValue('prefecture', event.target.value); // Set the value in formik
    };

    const renderPrefectureOptions = allPrefectures.map((prefecture, index) => (
        <option
            key={index}
            value={prefecture.prefecture_name} // Use prefecture name as the value
        >
            {prefecture.prefecture_name}
        </option>
    ));

    const formSchema = yup.object().shape({
        newUserName: yup.string()
            .min(5, "Username must be atleast 5 characters long")
            .max(15, "Username can not be longer than 15 characthers.")
            .required("Must enter a username"),
        
        newUserInfo: yup.string()
            .min(0, "User Info must be at least 0 characthers")
            .max(250, "User Info must be no longer than 250 characthers"),

        newUserPassword: yup.string()
            .min(6, "Password must be at least 6 characthers")
            .max(20, "Password can not be longer than 20 characthers")
            .required("User must enter a new password"),

        newUserPic: yup.string(),

        newUserHomeCountry: yup.string()
            .oneOf(country_list, "Please enter a valid country"),

        newUserHomeTown: yup.string(),

        newUserCurrentCountry: yup.string()
            .oneOf(country_list, "Please enter a valid country"),

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
            newUserCurrentCountry: "",
            newUserCurrentTown: "",

            businessName: "",
            email: "",
            contactNumber: "",
            buildingNumber: "",
            neighbourhood: "",
            city: "",
            postalCode: "",
            businessPrefectureId: "",

            openingTime: "",
            closingTime: ""
            //Remember to sort prefecture Id
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            values.newUserRole = newUserRole
            values.businessPrefectureId = businessPrefectureId;
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
                throw new Error("Faled to create user")
            }).then((newUser) => {
                setUsers([...users, newUser])
                setUserSignedUp(true)
                setSignedUpUserName(values.newUserName)
            })
        }
    })

    const inforForAll = 
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
                placeholder="Create your bio"
            />

            <input 
                type="text"
                name="newUserPic"
                className="newUserInput"
                value={formik.values.newUserPic}
                onChange={formik.handleChange}
                placeholder="Upload your cover photo"
            />
        </>
    
    let newUser;

    const travelerCitizenSignUp = 
        <div id="newUserContainer">
        {inforForAll}

        <select
            className="newUserInput"
            value={formik.values.newUserHomeCountry}
            onChange={formik.handleChange}
            name="newUserHomeCountry"
        >
            <option>Select Home Country</option>
            {country_list.map(country => (
                <option
                    key={country}
                >
                    {country}
                </option>
            ))}
        </select>

        <input 
            type="text"
            name="newUserHomeTown"
            className="newUserInput"
            value={formik.values.newUserHomeTown}
            onChange={formik.handleChange}
            placeholder="Enter your home town"
        />

        <select
            className="newUserInput"
            value={formik.values.newUserCurrentCountry}
            onChange={formik.handleChange}
            name="newUserCurrentCountry"
        >
            <option>Select Current Country</option>
            {country_list.map(country => (
                <option
                    key={country}
                >
                    {country}
                </option>
            ))}
        </select>

        <input 
            type="text"
            name="newUserCurrentTown"
            className="newUserInput"
            value={formik.values.newUserCurrentTown}
            onChange={formik.handleChange}
            placeholder="Enter your current town"
        />

        <button type="submit">
            Create New Traveler
        </button>
    </div> 

    if (newUserRole === "Traveller") {
        newUser = travelerCitizenSignUp     
    }

    else if (newUserRole === "Citizen") {
        newUser = travelerCitizenSignUp
    }

    else if (newUserRole === "Local Business") {
        newUser = 
        businessSignUpPg === 1 ?
            <>
                {inforForAll}

                <input 
                    type="text"
                    name="businessName"
                    className="newUserInput"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    placeholder="Enter your businesses name"
                />

                <input 
                    type="text"
                    name="email"
                    className="newUserInput"
                    value={formik.email}
                    onChange={formik.handleChange}
                    placeholder="Enter your businesses email"
                />

                <input 
                    type="text"
                    name="contactNumber"
                    className="newUserInput"
                    value={formik.contactNumber}
                    onChange={formik.handleChange}
                    placeholder="Enter your businesses number"
                />

                <div id="businessSignUpButtonContainer">
                    <button
                        className="businessSignUpButton"
                        onClick={() => setSelectedUserType(false)}
                    >
                        Go Back to Sign Up Choice
                    </button>

                    <button
                        onClick={() => setBusinessSignUpPg(businessSignUpPg + 1)}
                        className="businessSignUpButton"
                    >
                        Go to next page
                    </button>
                </div>
            </>
            :
            <>
                <input 
                    type="text"
                    name="buildingNumber"
                    className="newUserInput"
                    value={formik.values.buildingNumber}
                    onChange={formik.handleChange}
                    placeholder="Enter your businesses building number"
                />

                <input 
                    type="text"
                    name="neighbourhood"
                    className="newUserInput"
                    value={formik.values.neighbourhood}
                    onChange={formik.handleChange}
                    placeholder="Enter the neighbourhood of your business"
                />

                <input 
                    type="text"
                    name="city"
                    className="newUserInput"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    placeholder="Enter the city of your business"
                />

                <select
                    className="newUserInput"
                    value={formik.values.prefecture}
                    onChange={handlePrefectureChange}
                    name="prefecture"
                >
                    <option value="" disabled>Select Prefecture</option> {/* Placeholder option */}
                    {renderPrefectureOptions}
                </select>

                <input 
                    type="text"
                    name="postalCode"
                    className="newUserInput"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    placeholder="Enter your businesses post code"
                />

                <h4
                    style={{
                        color: "white",
                        textAlign: "center",
                        marginBottom: "0px"
                    }}
                >
                    Please enter opening time
                </h4>
                <input 
                    type="time"
                    name="openingTime"
                    className="newUserInput"
                    value={formik.values.openingTime}
                    onChange={formik.handleChange}
                    placeholder="Enter opening time"
                />

                <h4
                    style={{
                        color: "white",
                        textAlign: "center",
                        marginBottom: "0px"
                    }}
                >
                    Please enter closing time
                </h4>
                <input 
                    type="time"
                    name="closingTime"
                    className="newUserInput"
                    value={formik.values.closingTime}
                    onChange={formik.handleChange}
                    placeholder="Enter closing time"
                />

                <div id="businessSignUpButtonContainer">
                    <button
                        className="businessSignUpButton"
                        onClick={() => setBusinessSignUpPg(businessSignUpPg - 1)}
                    >
                        Go Back to Previous Page
                    </button>

                    <button
                        type="submit"
                        className="businessSignUpButton"
                    >
                        Create New User
                    </button>
                </div>
            </>
    }

    return(
        <div
            id="signUpDiv"
        >
            <h1 id="signUpTitle">
                Sign Up Form 
            </h1>

            {selectedUserType ? 
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <h3
                        className="signUpTypeInstruction"
                    >
                        Please fill out the below to set up a {newUserRole} Account
                    </h3>

                    {newUser}
                </form>
                :
                <div>
                    <h3
                        className="signUpTypeInstruction"
                    >
                        Please Choose Account Type from the Below:
                    </h3>

                    {typeButtons}
                </div>
            }
        </div>
    )
}

export default UserSignUp;


 