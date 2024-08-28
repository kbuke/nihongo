import axios from "axios"
import { useState } from "react"


function UploadNewPic({
    appData,
    specificBusinessId,
    loggedUserId,
    prefectureId,
    setUploadPic
}){
    const [newImg, setNewImg] = useState()

    console.log(`Logged in user is ${loggedUserId}, trying to upload a picture to business ${specificBusinessId} in prefecture ${prefectureId}`)

    const allPictures = appData.allPictures
    const setAllPictures = appData.setAllPictures

    console.log(allPictures)
    console.log(setAllPictures)

    const handleFileChange = (e) => {
        setNewImg(e.target.files[0])
    }

    const handlePush = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", newImg)
        formData.append("businessId", specificBusinessId)
        formData.append("prefectureId", prefectureId)
        formData.append("userId", loggedUserId)

        try {
            const response = await axios.post('/prefecturepics', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            setAllPictures([...allPictures, response.data])
            setUploadPic(false)
        } catch (error) {
            console.error("Error uploading file", error)
        }
    }

    return(
        <form
            id="profilePictureModal"
            onSubmit={handlePush}
        >
            <h1>
                Upload a New Picture
            </h1>

            <div className="newPicUploadGrid">
                <h4>Choose Picture to Upload</h4>
                <input 
                    type="file"
                    onChange={handleFileChange}
                />
            </div>

            <div>
                <button type="submit">
                    Upload New Pic
                </button>

                <button
                    onClick={() => setUploadPic(false)}
                >
                    Cancel Upload
                </button>
            </div>
        </form>
    )
}
export default UploadNewPic