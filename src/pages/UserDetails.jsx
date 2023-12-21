import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToyReviewList } from '../cpms/ToyReviewList'
import { loadReviews, resetFilterBy } from '../store/actions/review.actions'
import { setFilterBy,removeReview } from '../store/actions/review.actions'
import { NavLink, useNavigate } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function UserDetails() {
    const { loggedinUser: user } = useSelector(storeState => storeState.userModule)
    const { reviews } = useSelector(storeState => storeState.reviewModule)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            resetFilterBy()
            setFilterBy({ byUserId: user._id })
            loadReviews()
        } catch (err) {
            console.log('Had issues in toy details', err)
        }
    }, [])

    useEffect(()=>{
        console.log('effect')
        if(!user){
            navigate('/toy')
        }
    },[user])

    async function onRemoveReview(reviewId) {
        console.log('onRemoveReview', reviewId)
        try {
            await removeReview(reviewId)
            showSuccessMsg('Remove review: ' + reviewId)
        } catch (err) {
            console.log('Had issues in remove review', err)
            showErrorMsg('Cannot Remove review:' )
        }
    }

    if (!user) return ''
    return (
        <section className="user-details">
            <h3>{user.fullname} {user.isAdmin && <span>- Admin</span>}</h3>
            <ToyReviewList reviews={reviews} onRemoveReview={onRemoveReview} loggedinUser={user}  />
        </section>
    )
}