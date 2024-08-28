
import { useFormik } from "formik"
import { useOutletContext } from "react-router-dom"
import * as yup from "yup"

function BusinessAddress({
    formik,
    setBusinessPrefectureId
}){
    const appData = useOutletContext()

    const allPrefectures = appData.prefectures
    console.log(allPrefectures)

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
    return(
        <>
            <input 
                type="text"
                name="buildingNumber"
                className="newUserInput"
                value={formik.values.buildingNumber}
                placeholder="Enter your Businesses Building Number"
                onChange={formik.handleChange}
            />

            <input 
                type="text"
                name="neighbourhood"
                className="newUserInput"
                value={formik.values.neighbourhood}
                placeholder="Enter your Businesses Neighbourhood"
                onChange={formik.handleChange}
            />

            <input 
                type="text"
                name="city"
                className="newUserInput"
                value={formik.values.city}
                placeholder="Enter your Businesses Ward"
                onChange={formik.handleChange}
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
                placeholder="Enter your Businesses Post-Code"
                onChange={formik.handleChange}
            />

            <h4
                style={{
                    color: "white",
                    textAlign: "center"
                }}
            >
                Enter Your Businesses Operating Hours
            </h4>
            
            <input 
                type="time"
                name="openingTime"
                className="newUserInput"
                value={formik.values.openingTime}
                placeholder="Enter your Businesses Opening Time"
                onChange={formik.handleChange}
            />

            <input 
                type="time"
                name="closingTime"
                className="newUserInput"
                value={formik.values.closingTime}
                placeholder="Enter your Businesses Closing Time"
                onChange={formik.handleChange}
            />
        </>
    )
}
export default BusinessAddress