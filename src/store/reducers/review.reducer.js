import { reviewService } from "../../services/review.service.js"

export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const SET_REVIEW_FILTER = 'SET_REVIEW_FILTER'


const initialState = {
    reviews: [],
    filterBy: reviewService.getDefaultFilter(),
    // sortBy: reviewService.getDefaultSort(),
}

export function reviewReducer(state = initialState, action = {}) {
    let reviews
    switch (action.type) {
        case SET_REVIEWS:
            return { ...state, reviews: action.reviews }

        case REMOVE_REVIEW:
            reviews = state.reviews.filter(review => review._id !== action.reviewId)
            return { ...state, reviews }

        case ADD_REVIEW:
            reviews = [...state.reviews, action.review]
            return { ...state, reviews }

        case SET_REVIEW_FILTER:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default:
            return state;
    }
}