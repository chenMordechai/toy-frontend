import { reviewService } from "../../services/review.service.js"

import { ADD_REVIEW, SET_REVIEWS } from "../reducers/review.reducer.js";
import { store } from "../store.js";


export async function loadReviews() {
    const { filterBy } = store.getState().reviewModule
    const { sortBy } = store.getState().reviewModule
    try {
        const reviews = await reviewService.query(filterBy, sortBy)
        store.dispatch({ type: SET_REVIEWS, reviews })
    } catch (err) {
        console.log('review action -> Cannot load reviews', err)
        throw err
    }
}

export async function saveReview(review) {
    try {
        const reviewToSave = await reviewService.save(review)
        store.dispatch({ type: ADD_REVIEW, review: reviewToSave })
        return reviewToSave

    } catch (err) {
        console.log('review action -> Cannot save review review', err)
        throw err

    }
}