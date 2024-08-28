import { useState } from "react"


function ChangeProfilePic({
    pictureId,
    setChangePic
}){
    const [newPic, setNewPic] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleNewPic = (e) => {
        setNewPic(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!newPic) {
            setError("Please select a file to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", newPic);
    
        setLoading(true);
        setError(null);
    
        fetch(`/profilepics/${pictureId}`, {
            method: "PATCH",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            if (data.error) {
                setError("Failed to update profile picture.");
            } else {
                setChangePic(false);
                window.location.reload(); // Reload the page
            }
        })
        .catch(err => {
            setLoading(false);
            setError("An error occurred. Please try again.");
            console.error(err);
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Upload New Profile Picture:</h2>
                <input 
                    type="file"
                    id="fileSelect"
                    onChange={handleNewPic}
                    accept=".png, .jpg, .jpeg, .gif"
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading? "Uploading..." : "Change Profile Picture"}
                </button>
            </div>
        </form>
    )
}
export default ChangeProfilePic