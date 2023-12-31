import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyReviewList } from "../cpms/ToyReviewList.jsx"
import { ToyReviewFilter } from "../cpms/ToyReviewFilter.jsx"
import { loadReviews, resetFilterBy, setFilterBy, setSortBy, removeReview } from '../store/actions/review.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';


export function ReviewExplore() {
    const { filterBy } = useSelector(storeState => storeState.reviewModule)
    const { sortBy } = useSelector(storeState => storeState.reviewModule)
    const { reviews } = useSelector(storeState => storeState.reviewModule)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)

    useEffect(() => {
        resetFilterBy()
    }, [])

    useEffect(() => {
        loadReviews()
    }, [filterBy, sortBy])

    function onSetFilterBy(ev) {
        let { name, value } = ev.target
        setFilterBy({ [name]: value })
    }

    function onSetSortBy(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'checkbox') value = (checked) ? -1 : 1
        setSortBy({ [name]: value })
    }

    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Remove Review: ' + reviewId)
        } catch (err) {
            console.log('Had issues in remove review', err)
            showErrorMsg('Cannot Remove Review')
        }
    }

    return (
        <section className="review-explore">
            <section className="filter-container">
                <h3>Reviews:</h3>
                <ToyReviewFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} sortBy={sortBy} onSetSortBy={onSetSortBy} />
                <ToyReviewList reviews={reviews} onRemoveReview={onRemoveReview} loggedinUser={loggedinUser} />
            </section>
        </section>
    )
}