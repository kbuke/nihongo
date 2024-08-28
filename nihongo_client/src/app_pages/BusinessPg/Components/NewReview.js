import "./NewReview.css"

import { useFormik } from "formik"
import * as yup from "yup"

function NewReview({
    allBusinessReviews,
    setAllBusinessReviews,
    setNewReview,
    loggedUserId,
    specificBusinessId
}){

    const formSchema = yup.object().shape({
        newReviewRating: yup.number()
            .min(1, "Rating can not be lower than 1")
            .max(5, "Rating can not be higher than 5")
            .required("Must enter a rating"),
        newReviewComment: yup.string()
            .min(10, "Review can not be less than 10 characters")
            .max(50, "Review can not be more than 50 characthers.")
            .required("Must enter a review comment")
    })

    const formik = useFormik({
        initialValues: {
            newReviewRating: "",
            newReviewComment: "",
            newBusinessId: "",
            newUserId: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            values.newReviewRating = parseInt(values.newReviewRating);
            values.newUserId = loggedUserId
            values.newBusinessId = specificBusinessId
            fetch("/businessreviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            }).then((res) => {
                if(res.status === 201) {
                    return res.json()
                }
                throw new Error("Failed to create review")
            }).then((newReview) => {
                setAllBusinessReviews([...allBusinessReviews, newReview])
                setNewReview(false)
            })
        }
    })

    const availableRatings = [1, 2, 3, 4, 5]

    const userInputs = 
        <>
            <select
                id="reviewRatingSelection"
                value={formik.values.newReviewRating}
                onChange={formik.handleChange}
                name="newReviewRating"
            >
                <option>Select a Rating</option>
                {availableRatings.map((ratings, index) => (
                    <option key={index}>{ratings}</option>
                ))}
            </select>
            {formik.errors.newReviewRating && <div id="reviewInputError">{formik.errors.newReviewRating}</div>}

            <input 
                type="text"
                name="newReviewComment"
                id="reviewCommentInput"
                value={formik.values.newReviewComment}
                onChange={formik.handleChange}
                placeholder="Please enter review comment"
            />
            {formik.errors.newReviewComment && <div id="reviewInputError">{formik.errors.newReviewComment}</div>}
        </>
    return(
        <form
            id="newReviewModal"
            onSubmit={formik.handleSubmit}
        >
            <h1>Create a Review</h1>
            <div id="newReviewBlock">
                {userInputs}
                <div>
                    <button type="submit">Submit Review</button>
                    <button onClick={() => setNewReview(false)}>Cancel Review</button>
                </div>
            </div>
        </form>

    )
}
export default NewReview