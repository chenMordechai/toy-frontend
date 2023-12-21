import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export function ToyReviewList({ reviews, onRemoveReview, loggedinUser }) {
    const [isReviewPage, setIsReviewPage] = useState(false)
    const params = useParams()

    useEffect(() => {
        if (!params.toyId) {
            setIsReviewPage(() => true)
        }
    }, [])

    return (
        <section className="toy-review-list">
            <h3>Reviews:</h3>
            <ul>{reviews.map(r => <li
                key={r._id}>
                {loggedinUser?.isAdmin && <button className="btn" onClick={() => {
                    onRemoveReview(r._id)
                }}>x</button>}
                {r.txt}
                <span>{r.byUser.fullname}</span>
                <span>{isReviewPage && r.aboutToy.name}</span>
            </li>)}</ul>

        </section>
    )
}