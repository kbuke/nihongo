import { useState } from "react";
import "./UpdateProfilePic.css";

function UpdateProfilePic({ setUpdateProfilePic, specificProfilePicId }) {
    const [newPic, setNewPic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdatePic = (e) => {
        setNewPic(e.target.files[0]);
    };

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
    
        fetch(`/profilepics/${specificProfilePicId}`, {
            method: "PATCH",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            if (data.error) {
                setError("Failed to update profile picture.");
            } else {
                setUpdateProfilePic(false);
                window.location.reload(); // Reload the page
            }
        })
        .catch(err => {
            setLoading(false);
            setError("An error occurred. Please try again.");
            console.error(err);
        });
    };
    

    return (
        <div className="modal">
            <form id="updateProfilePicContainer" onSubmit={handleSubmit}>
                <h2>Update Profile Picture</h2>
                <input 
                    type="file"
                    id="fileSelect"
                    onChange={handleUpdatePic}
                    accept=".png, .jpg, .jpeg, .gif" // Restrict file types if needed
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Change Profile Picture"}
                </button>
                <button type="button" onClick={() => setUpdateProfilePic(false)}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateProfilePic;
