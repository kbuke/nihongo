import "./EditPrefectureInfo.css";

function EditPrefectureInfo({
    setEditInfo,
    prefectureInfoText,
    setPrefectureInfoText,
    specificPrefectureId,
    allPrefectures,
    setAllPrefectures
}) {
    console.log(prefectureInfoText);

    const handleInfoEdit = (e) => {
        e.preventDefault();
        fetch(`/prefectures/${specificPrefectureId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prefecture_info: prefectureInfoText
            })
        })
        .then((r) => {
            console.log("Response status:", r.status);
            if (r.ok) {
                return r.json();
            } else {
                console.error("Failed to update prefecture info");
                return r.json().then(err => Promise.reject(err));
            }
        })
        .then((newInfo) => {
            if (!newInfo) {
                throw new Error("Received undefined response");
            }
            setAllPrefectures(allPrefectures.map(oldPrefecture => 
                oldPrefecture.id === newInfo.id ? newInfo : oldPrefecture
            ));
            setEditInfo(false); // Close the edit form after successful update
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error updating prefecture info:", error);
        });
    };

    return (
        <form 
            id="prefectureInfoForm"
            onSubmit={handleInfoEdit}
        >
            <textarea
                id="prefectureNewInfo"
                value={prefectureInfoText}
                onChange={(e) => setPrefectureInfoText(e.target.value)}
            />
            <div id="changePrefectureButtonContainer">
                <button 
                    className="prefectureInfoEditButton"
                    type="submit"
                >
                    Submit Changes
                </button>

                <button 
                    className="prefectureInfoEditButton"
                    type="button"
                    onClick={() => setEditInfo(false)}
                >
                    Cancel Changes
                </button>
            </div>
        </form>
    );
}

export default EditPrefectureInfo;