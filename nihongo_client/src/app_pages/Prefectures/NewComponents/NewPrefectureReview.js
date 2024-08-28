import { useState } from "react";
import "./NewPrefectureReview.css";
import { Link } from "react-router-dom";

function NewPrefectureReview({
    userId,
    prefectureId,
    categoryId,
    appData,
    setNewRating,
    prefectureName,
    categoryType
}) {
    const allPrefectureRatings = appData.allPrefectureCategoryReviews;
    const setAllPrefectureRatings = appData.setAllPrefectureCategoryReviews;

    const [newReview, setNewReview] = useState(false);
    const [rating, setRating] = useState("");

    console.log(rating);

    const ratingOptions = [1, 2, 3, 4, 5];

    const renderRatingOptions = ratingOptions.map((option, index) => (
        <option 
            key={index}
            value={option}
        >
            {option}
        </option>
    ));

    console.log(allPrefectureRatings);

    const checkRatings = allPrefectureRatings.filter(
        rating => rating.user_id === userId && 
                  rating.prefecture_id === prefectureId && 
                  rating.prefecture_type_id === categoryId
    );
    console.log(checkRatings);

    const filterSpecificTypeRatings = allPrefectureRatings.filter(
        rating => rating.prefecture_id === prefectureId && 
                  rating.prefecture_type_id === categoryId
    );
    console.log(filterSpecificTypeRatings);

    const renderPrevRating = filterSpecificTypeRatings.length > 0 ?
        filterSpecificTypeRatings.map((rating, index) => (
            <div 
                id="specificPrevPrefectureRatingGrid"
                key={index}
            >
                <Link 
                    id="specificPrevPrefectureRatingPicContainer"
                    to={`/users/${rating.user_id}`}
                >
                    <img 
                        id="specificPrevPrefectureRatingPic"
                        src={rating.user.profile_picture?.picture_route}
                        alt={`${rating.user.username}'s profile`}
                    />
                </Link>

                <div>
                    <h3
                        id="prevRatingUserName"
                    >
                        {rating.user.username}
                    </h3>

                    <h4
                        id="prevRatingDisplay"
                    >
                        Rated {categoryType}: {rating.rating} ⭐️'s
                    </h4>
                </div>

            </div>
        ))
        :
        <h2>No one has rated {prefectureName}'s {categoryType} Yet!</h2>;

    const handlePush = (e) => {
        e.preventDefault();
        if (rating === "") {
            alert("Please select a rating before submitting!");
            return;
        }
        const jsonData = {
            userId,
            prefectureId,
            categoryId,
            rating: parseInt(rating, 10)
        };
        fetch("/prefectureratings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newReview => {
                setAllPrefectureRatings([...allPrefectureRatings, newReview]);
                setNewReview(false); // Close the rating window after submission
            })
            .catch(error => console.error("Error leaving review", error));
    };

    return (
        <div id="specificPrefectureReviewContainer">
            <h1>{prefectureName}'s {categoryType} Ratings</h1>
            <div id="specificPrefectureReviewGrid">
                <div id="specificPrefectureReviewGridLeftSide">
                    {checkRatings.length > 0 ? (
                        <>
                            <h1>You have already rated {prefectureName}'s {categoryType}</h1>
                            <button onClick={() => setNewRating(false)}>Close Rating Window</button>
                        </>
                    ) : (
                        <div>
                            <button onClick={() => setNewReview(true)}>
                                Rate {prefectureName}'s {categoryType}
                            </button>

                            <button onClick={() => setNewRating(false)}>
                                Stop Review
                            </button>

                            {newReview && (
                                <div>
                                    <select
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select your rating
                                        </option>
                                        {renderRatingOptions}
                                    </select>

                                    <button onClick={handlePush}>Submit Review</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div id="specificPrefectureReviewGridRightSide">
                    {renderPrevRating}
                </div>
            </div>
        </div>
    );
}

export default NewPrefectureReview;
