import { useState } from "react"

import "./UpdateBusinessTypes.css"
import { render } from "@testing-library/react"

function UpdateBusinessTypes({
    appData,
    specificBusinessId,
    setUpdateBusinessTypes
}){
    const allBusinessTypes = appData.businessTypes
    console.log(allBusinessTypes)
    const[businessTypeOne, setBusinessTypeOne] = useState()
    const[businessTypeTwo, setBusinessTypeTwo] = useState()
    const[businesstypeThree, setBusinessTypeThree] = useState()

    console.log(`my first business type is ${businessTypeOne}, then it is ${businessTypeTwo}, and finally ${businesstypeThree}`)

    const renderOptions = allBusinessTypes.map((type, index) => (
        <option
            key={index}
            value={type.id}
        >
            {type.business_type}
        </option>
    ))

    const allBusinessTypeConnection = appData.businessTypeConnections
    const setBusinessTypeConnections = appData.setBusinessTypeConnections

    const handlePush = (e) => {
        e.preventDefault();
        const businessTypes = [businessTypeOne, businessTypeTwo, businesstypeThree].filter(Boolean); // Filters out any empty values
    
        const jsonData = {
            specificBusinessId,
            businessTypes // This sends an array of the selected business types
        };
    
        fetch("/businesstypesconnection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newConnections => setBusinessTypeConnections([...allBusinessTypeConnection, ...newConnections]))
            .then(setUpdateBusinessTypes(false))
            .catch(err => console.error("Error:", err));
    };

    return(
        <form
            id="prefectureUpdateModal"
            onSubmit={handlePush}
        >
            <div
                className="newBusinessTypeGrid"
            >
                <h4>Enter your first business type: </h4>
                <select
                    value={businessTypeOne}
                    onChange={(e) => setBusinessTypeOne(e.target.value)}
                >
                    <option>Select new business type</option>
                    {renderOptions}
                </select>
            </div>

            <div
                className="newBusinessTypeGrid"
            >
                <h4>Enter your second business type: </h4>
                <select
                    value={businessTypeTwo}
                    onChange={(e) => setBusinessTypeTwo(e.target.value)}
                >
                    <option>Select new business type</option>
                    {renderOptions}
                </select>
            </div>

            <div
                className="newBusinessTypeGrid"
            >
                <h4>Enter your third business type: </h4>
                <select
                    value={businesstypeThree}
                    onChange={(e) => setBusinessTypeThree(e.target.value)}
                >
                    <option>Select new business type</option>
                    {renderOptions}
                </select>

            </div>

            <div
                id="updateBusinessTypeButtons"
            >
                <button
                    type="submit"
                >
                    Submit
                </button>

                <button
                    id="closeTypeButton"
                    onClick={() => setUpdateBusinessTypes(false)}
                >
                    Cancel
                </button>
            </div>

        </form>
    )

}
export default UpdateBusinessTypes