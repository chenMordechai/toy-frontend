import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToyReviewList } from '../cpms/ToyReviewList'
import { loadReviews, resetFilterBy } from '../store/actions/review.actions'
import { setFilterBy } from '../store/actions/review.actions'

export function UserDetails() {
    const { loggedinUser: user } = useSelector(storeState => storeState.userModule)
    console.log('user:', user)
    const { reviews } = useSelector(storeState => storeState.reviewModule)
    console.log('reviews:', reviews)

    useEffect(() => {
        try {
            resetFilterBy()
            setFilterBy({ byUserId: user._id })
            loadReviews()
        } catch (err) {
            console.log('Had issues in toy details', err)
        }
    }, [])

    return (
        <section className="userDetails">
            <h3>{user.fullname} {user.isAdmin && <span>- Admin</span>}</h3>
            <h4>Reviews:</h4>
            <ToyReviewList reviews={reviews} />
        </section>
    )
}