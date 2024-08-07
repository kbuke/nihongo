import { useEffect, useState } from "react";

import axios from "axios";

import "./UserUploadPictures.css";

function UserUploadPictures({ 
    specificUserInfo,
    allPictures,
    setAllPictures
}) {
    console.log(specificUserInfo);
    const [modal, setModal] = useState(false);
    const [hover, setHover] = useState(false);
    const [image, setImage] = useState();
    const [prefectureId, setPrefectureId] = useState(""); // Initial value is empty
    const [businessId, setBusinessId] = useState("");

    const userId = specificUserInfo.id

    const handleNewFile = (e) => {
        setImage(e.target.files[0]);
    };

    //Handle the new upload
    const handlePush = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('businessId', businessId);
        formData.append('prefectureId', prefectureId);
        formData.append('userId', userId); 

        try {
            const response = await axios.post('/prefecturepics', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);

            // Update the state to include the new picture
            setAllPictures([...allPictures, response.data]);
            setModal(false)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // Show prefectures the user has visited
    const userPrefectures = specificUserInfo.prefecture_visit;

    const sortPrefectures = userPrefectures
        ? userPrefectures.sort((a, b) => a.prefecture.prefecture_name.localeCompare(b.prefecture.prefecture_name))
        : [];

    // Show all prefectures you have visited
    const prefectureOptions = sortPrefectures.map((prefecture, index) => (
        <option key={index} value={prefecture.prefecture.id}>
            {prefecture.prefecture.prefecture_name}
        </option>
    ));

    // Show businesses the user has visited
    const userBusinesses = specificUserInfo.business_visit;

    const sortBusinesses = userBusinesses
        ? userBusinesses.sort((a, b) => a.business.name.localeCompare(b.business.name))
        : [];

    const filterBusinesses = sortBusinesses.filter(business => business.business.prefecture_id === parseInt(prefectureId));
    const availableBusinesses = filterBusinesses.map((business, index) => (
        <option key={index} value={business.business.id}>
            {business.business.name}
        </option>
    ));

    return (
        !modal ? 
            <div id="uploadPicButtonContainer">
                <button
                    className="uploadPicButton"
                    id={hover ? "hoverUploadButton" : null}
                    onClick={() => setModal(true)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    UPLOAD NEW PICTURE
                </button>
            </div>
            :
            <form 
                className="modal"
                onSubmit={handlePush}
            >
                <div id="uploadPicPopUp">
                    <button     
                        id="exitButton"
                        onClick={() => setModal(false)}
                    >
                        ❌
                    </button>

                    <div id="uploadPicBlock">
                        <h1>Upload New Picture</h1>

                        <div className="uploadPicInput">
                            <h3>Selected Picture</h3>
                            <input
                                type="file"
                                id="fileSelect"
                                onChange={handleNewFile}
                            />
                        </div>

                        <div className="uploadPicInput">
                            <h3>Select Prefecture</h3>
                            <select
                                id="pictureSelectBox"
                                value={prefectureId}
                                onChange={(e) => setPrefectureId(e.target.value)}
                            >
                                <option value="" disabled selected>Choose Prefecture</option>
                                {prefectureOptions}
                            </select>
                        </div>

                        <div className="uploadPicInput">
                            <h3>Select Business</h3>
                            <select
                                id="businessSelectBox"
                                value={businessId}
                                onChange={(e) => setBusinessId(e.target.value)}
                            >
                                <option value="" disabled selected>Choose Business</option>
                                {availableBusinesses}
                            </select>
                        </div>

                        <button type="submit">Upload New Picture</button>
                    </div>
                </div>
            </form>
    );
}

export default UserUploadPictures;
