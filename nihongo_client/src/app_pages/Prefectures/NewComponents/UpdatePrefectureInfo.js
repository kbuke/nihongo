import "./UpdatePrefectureInfo.css"

import { useEffect } from "react";

function UpdatePrefectureInfo({
    setUpdatePrefectureInfo,
    prefectureInformation,
    setPrefectureInformation,
    specificPrefectureId,
    prefectureBackgroundImage,
    setPrefectureBackgroundImage,
    appData
}){

    console.log(prefectureInformation)

    const allPrefectures = appData.prefectures
    const setAllPrefectures = appData.setAllPrefectures

    //Ensure pg doesnt scroll behind
    useEffect(() => {
        // Disable scrolling on the page behind the modal
        document.body.style.overflow = 'hidden';
        return () => {
            // Re-enable scrolling when the modal is closed
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handlePatch = () => {
        fetch(`/prefectures/${specificPrefectureId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prefecture_img: prefectureBackgroundImage,
                prefecture_info: prefectureInformation
            })
        })
        .then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update info")
            }
        })
        .then((newPrefectureInfo) => 
            setAllPrefectures(allPrefectures.map(oldPrefectureInfo =>
                oldPrefectureInfo.id === newPrefectureInfo.id ? newPrefectureInfo : oldPrefectureInfo
            ))
        )
        .then(setUpdatePrefectureInfo(false))
    }

    return(
        <div
            id="prefectureUpdateModal"
        >
            <h2>
                Update Prefectures Info
            </h2>

            <div
                id="updatePrefecturePicGrid"
            >
                <h3>Update Prefectures Background Picture:</h3>

                <input 
                    placeholder="Enter new backgrounds URL"
                    onChange={(e) => setPrefectureBackgroundImage(e.target.value)}
                />
            </div>

            <div
                id="prefectureUpdateInfoGrid"
            >
                <h3>Update Prefectures Information</h3>

                <textarea
                    value={prefectureInformation}
                    onChange={(e) => setPrefectureInformation(e.target.value)}
                />
            </div>

            <div>
                <button
                    onClick={handlePatch}
                >
                    Update Prefecture Information
                </button>

                <button
                    onClick={() => setUpdatePrefectureInfo(false)}
                >
                    Cancel Prefecture Updates
                </button>
            </div>
        </div>
    )
}
export default UpdatePrefectureInfo