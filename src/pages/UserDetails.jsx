import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToyReviewList } from '../cpms/ToyReviewList'
import { loadReviews, resetFilterBy } from '../store/actions/review.actions'
import { setFilterBy,removeReview } from '../store/actions/review.actions'

export function UserDetails() {
    const { loggedinUser: user } = useSelector(storeState => storeState.userModule)
    const { reviews } = useSelector(storeState => storeState.reviewModule)

    useEffect(() => {
        try {
            resetFilterBy()
            setFilterBy({ byUserId: user._id })
            loadReviews()
        } catch (err) {
            console.log('Had issues in toy details', err)
        }
    }, [])

    async function onRemoveReview(reviewId) {
        console.log('onRemoveReview', reviewId)
        try {
            await removeReview(reviewId)
        } catch (err) {
            console.log('Had issues in remove review', err)
        }
    }

    if (!user) return ''
    return (
        <section className="user-details">
            <h3>{user.fullname} {user.isAdmin && <span>- Admin</span>}</h3>
            <h4>Reviews:</h4>
            <ToyReviewList reviews={reviews} onRemoveReview={onRemoveReview} loggedinUser={user}  />
        </section>
    )
}