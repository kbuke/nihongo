import axios from "axios";
import { useEffect, useState } from "react";

import "./BusinessPhotos.css"
import ViewBigPic from "./ViewBigPic";

function BusinessPhotos({ businessInfo, specificUserInfo }) {
    const [image, setImage] = useState(null);
    const [allBusinessPics, setAllBusinessPics] = useState([]);
    const [viewBigImg, setViewBigImg] = useState(false)
    const [bigImg, setBigImg] = useState()
    const [username, setUsername] = useState()
    const [userImg, setUserImg] = useState()
    const [filterPictures, setFilterPictures] = useState([])

    // Get the ids of the user, business, and prefecture
    const businessId = businessInfo.id;
    const prefectureId = businessInfo.prefecture_id;
    const userId = specificUserInfo.id;

    // Get all pictures
    useEffect(() => {
        fetch("/prefecturepics")
            .then((r) => {
                if (r.ok) {
                    return r.json();
                }
                throw r;
            })
            .then((pics) => setAllBusinessPics(pics))
            .catch((error) => console.error("Error fetching pictures:", error));
    }, []);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

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
            setAllBusinessPics([...allBusinessPics, response.data]);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    console.log(allBusinessPics)

    useEffect(() => {
        setFilterPictures(allBusinessPics.filter(picture => picture.business_id === businessId))
    }, [allBusinessPics]);

    const handleBigPic = (image, username, profilePic) => {
        setViewBigImg(true)
        setBigImg(image)
        setUsername(username)
        setUserImg(profilePic)
    }

    return (
        <>
            {viewBigImg ? 
                <ViewBigPic 
                    setViewBigImg={setViewBigImg}
                    viewBigImg={viewBigImg}
                    bigImg={bigImg}
                    username={username}
                    userImg={userImg}
                    userId
                />
                :
                null
            }
            <form onSubmit={handlePush} id="uploadPictureForm">
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            <div id="photoGrid">
                {filterPictures.length === 0?
                    <h2 id="noPics">User has uploaded no pictures for business</h2>
                    :
                    <>
                        {filterPictures.map((pic, index) => (
                            <div
                                key={index}
                                id="picContainer"
                                onClick={() => handleBigPic(
                                    pic.picture_route,
                                    pic.user.username,
                                    pic.user.profile_picture
                                )}
                            >
                                <img 
                                    src={pic.picture_route}
                                    alt="Uploaded"
                                    id="uploadedPics"
                                />
                            </div>
                        ))}
                    </>
                }
            </div>
        </>
    );
}

export default BusinessPhotos;


