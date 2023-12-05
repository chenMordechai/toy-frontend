import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyReviewList } from "../cpms/ToyReviewList.jsx"
import { ToyReviewFilter } from "../cpms/ToyReviewFilter.jsx"
import { loadReviews, resetFilterBy, setFilterBy,setSortBy } from '../store/actions/review.actions.js'



export function ReviewExplore() {
    const { filterBy } = useSelector(storeState => storeState.reviewModule)
    const { sortBy } = useSelector(storeState => storeState.reviewModule)

    const { reviews } = useSelector(storeState => storeState.reviewModule)
   
    useEffect(() => {
        resetFilterBy()
    }, [])

    useEffect(() => {
            loadReviews()
    }, [filterBy,sortBy])

    function onSetFilterBy(ev) {
        let { name, value} = ev.target
        setFilterBy({ [name]: value })
    }

    function onSetSortBy(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'checkbox') value = (checked) ? -1 : 1
        setSortBy({ [name]: value })
    }

   
    return (
        <section className="review-explore">
            <h2>Review Explore</h2>
            <section className="reviews-container">
                        <h3>Reviews:</h3>
                        <ToyReviewFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} sortBy={sortBy} onSetSortBy={onSetSortBy}/>
                        <ToyReviewList reviews={reviews} />
                    </section>
        </section>
    )
}