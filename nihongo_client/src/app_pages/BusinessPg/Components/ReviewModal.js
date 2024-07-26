import "./ReviewModal.css";

function ReviewModal({ show, onClose, onSubmit }) {
    if (!show) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            rating: e.target.rating.value,
            comment: e.target.comment.value,
        };
        onSubmit(review);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Rating:
                        <input type="number" name="rating" min="1" max="5" required />
                    </label>
                    <label>
                        Comment:
                        <textarea name="comment" required></textarea>
                    </label>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
}

export default ReviewModal;