import "./EditBusinessInfo.css"

function EditBusinessInfo({
    setUpdatingBusinessInfo,
    specificBusinessId,
    businessName,
    businessesBio,
    setBusinessesBio,
    businessesCoverPhoto,
    setBusinessesCoverPhoto,
    setAllBusinesses,
    allBusinesses
}){
    console.log(businessesBio)
    console.log(specificBusinessId)

    const handlePatch = (e) => {
        e.preventDefault()
        fetch(`/users/${specificBusinessId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cover_photo: businessesCoverPhoto,
                user_info: businessesBio
            })
        })
        .then((r) => {
            if(r.ok) {
                return r.json();
            } else {
                console.error("Failed to update info");
                return null; // Explicitly return null if the request fails
            }
        })
        .then((newBusinessInfo) => {
            if (newBusinessInfo) { // Ensure newBusinessInfo is not undefined or null
                setAllBusinesses(allBusinesses.map(oldBusinessInfo => 
                    oldBusinessInfo.id === newBusinessInfo.id ? newBusinessInfo : oldBusinessInfo
                ));
            }
        })
        .then(() => setUpdatingBusinessInfo(false)) // Call this after the state update
        .catch(error => console.error("Error during patch request:", error)); // Add error handling
    };
    

    return(
        <form
            id="prefectureUpdateModal"
            onSubmit={handlePatch}
        >
            <h1 id="updateBusinessInformationHeaders">Update {businessName}'s Information</h1>

            <div id="updatingBusinessInfoGrid">
                <h2>
                    Update {businessName}'s Bio
                </h2>

                <textarea 
                    value={businessesBio}
                    onChange={(e) => setBusinessesBio(e.target.value)}
                />
            </div>

            <div id="updatingBusinessInfoGrid">
                <h2>
                    Update {businessName}'s Cover Photo
                </h2>

                <input 
                    placeholder="Enter new background URL"
                    onChange={(e) => setBusinessesCoverPhoto(e.target.value)}
                />
            </div>

            <div>
                <button
                    type="submit"
                >
                    Submit Changes
                </button>

                <button
                    onClick={() => setUpdatingBusinessInfo(false)}
                >
                    Cancel Changes
                </button>
            </div>
        </form>
    )
}
export default EditBusinessInfo