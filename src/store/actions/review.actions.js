import { reviewService } from "../../services/review.service.js"

import { ADD_REVIEW, SET_REVIEWS, SET_REVIEW_FILTER, RESET_REVIEW_FILTER,SET_REVIEW_SORT } from "../reducers/review.reducer.js";
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
export async function loadReview(reviewId) {
    try {
        const reviewToShow = await reviewService.getById(reviewId)
        store.dispatch({ type: ADD_REVIEW, review: reviewToShow })
        return reviewToShow
    } catch (err) {
        console.log('review action -> Cannot load review', err)
        throw err
    }
}

export async function saveReview(review) {
    try {
        const savedReview = await reviewService.save(review)
        // console.log('reviewToSave', reviewToSave)
        // store.dispatch({ type: ADD_REVIEW, review: reviewToSave })
        // return reviewToSave
        // loadReviews() // because we want to get the big review (after aggregate)
        const reviewToShow = loadReview(savedReview._id) // because we want to get the big review (after aggregate)
        return reviewToShow
    } catch (err) {
        console.log('review action -> Cannot save review review', err)
        throw err

    }
}

export function setFilterBy(filterBy) {
    console.log('filterBy:', filterBy)
    store.dispatch({ type: SET_REVIEW_FILTER, filterBy })
}

export function setSortBy(sortBy) {
    console.log('sortBy:', sortBy)
    store.dispatch({ type: SET_REVIEW_SORT, sortBy })
}

export function resetFilterBy() {
    store.dispatch({ type: RESET_REVIEW_FILTER })

}
