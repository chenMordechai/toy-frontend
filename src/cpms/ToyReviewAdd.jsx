import TextField from '@mui/material/TextField';
import { useState } from "react"
import { reviewService } from "../services/review.service"


export function ToyReviewAdd({ onSaveReview }) {
    const [reviewTxtToEdit, setReviewTxtToEdit] = useState(reviewService.getEmptyReview())

    function handleChange(ev) {
        setReviewTxtToEdit({ txt: ev.target.value })
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onSaveReview(reviewTxtToEdit)
        setReviewTxtToEdit(reviewService.getEmptyReview())
    }

    return (
        <section className="toy-msg-add">
            <form onSubmit={onSubmitForm}>
                <TextField id="outlined-basic" label="Text" variant="outlined" onChange={handleChange} value={reviewTxtToEdit.txt} name="txt" type="text" />
                <button className="btn dark">Save</button>
            </form>

        </section>
    )
}