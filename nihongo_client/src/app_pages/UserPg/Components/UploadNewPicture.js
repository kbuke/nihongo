import { useEffect, useState } from "react";
import "./UploadNewPicture.css";
import axios from "axios";

function UploadNewPicture({ 
    setUploadNewPic,
    specificUserInfo,
    loggedUser,
    allPictures,
    setAllPictures
}) {
    const [newImg, setNewImg] = useState();
    const [selectedPrefecture, setSelectedPrefecture] = useState("");
    const [selectedPrefectureId, setSelectedPrefectureId] = useState();
    const [selectedBusiness, setSelectedBusiness] = useState("");
    const [selectedBusinessId, setSelectedBusinessId] = useState();

    const userId = loggedUser.id

    // Show all prefectures the user has visited
    const visitedPrefectures = specificUserInfo.prefecture_visit;

    const visitedPrefectureOptions = visitedPrefectures.map((prefecture, index) => (
        <option key={index} value={prefecture.prefecture.prefecture_name}>
            {prefecture.prefecture.prefecture_name}
        </option>
    ));

    // Find prefecture id
    useEffect(() => {
        const filterPrefecture = visitedPrefectures.filter(prefecture => prefecture.prefecture.prefecture_name === selectedPrefecture)
        setSelectedPrefectureId(filterPrefecture[0]?.prefecture_id)
    }, [selectedPrefecture])


    // Find available businesses
    const visitedBusinesses = specificUserInfo.business_visit;

    const filterBusinesses = visitedBusinesses.filter(
        business => business.business?.prefecture_id === selectedPrefectureId
    );

    const visitedBusinessOptions = filterBusinesses.map((business, index) => (
        <option key={index} value={business.business.name}>
            {business.business.name}
        </option>
    ));

    // Find business id
    useEffect(() => {
        const filterBusiness = visitedBusinesses.filter(
            business => business.business.name === selectedBusiness
        )
        setSelectedBusinessId(filterBusiness[0]?.business_id)
    },[selectedBusiness])

    // Select new file to upload
    const handleFileChange = async (e) => {
        setNewImg(e.target.files[0]);
    };

    console.log(`You (user ${userId}) are attempting to upload a picture from ${selectedPrefecture} with id ${selectedPrefectureId} at ${selectedBusiness} with id ${selectedBusinessId}`)

    const handlePush = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", newImg)
        formData.append("businessId", selectedBusinessId)
        formData.append("prefectureId", selectedPrefectureId)
        formData.append("userId", userId)

        try {
            const response = await axios.post('/prefecturepics', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            setAllPictures([...allPictures, response.data])
            setUploadNewPic(false)
        } catch (error) {
            console.error("Error uploading file", error)
        }
    }

    return (
        <div id="newPicUploadModal">
            <form 
                id="newPicUploadContent"
                onSubmit={handlePush}
            >
                <h1>Upload New Picture</h1>
                <>
                    <div className="newPicUploadGrid">
                        <h4>Choose Picture to Upload</h4>
                        <input 
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="newPicUploadGrid">
                        <h4>Prefecture</h4>
                        <select 
                            value={selectedPrefecture} 
                            onChange={(e) => setSelectedPrefecture(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Please Choose where this Picture was taken
                            </option>
                            {visitedPrefectureOptions}
                        </select>
                    </div>

                    {filterBusinesses.length > 0 && (
                        <div className="newPicUploadGrid">
                            <h4>Business</h4>
                            <select 
                                value={selectedBusiness} 
                                onChange={(e) => setSelectedBusiness(e.target.value)}
                            >
                                <option value="" disabled hidden>
                                    Please Choose a business from {selectedPrefecture}
                                </option>
                                {visitedBusinessOptions}
                            </select>
                        </div>
                    )}
                </>

                <div>
                    <button type="submit">Upload New Picture</button>
                    <button onClick={() => setUploadNewPic(false)}>Close</button>
                </div>
            </form>
        </div>
    );
}

export default UploadNewPicture;


