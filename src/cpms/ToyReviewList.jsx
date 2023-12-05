


export function ToyReviewList({ reviews }) {
    return (
        <section className="toy-review-list">
            <ul>{reviews.map(r => <li
                key={r._id}>{r.txt}
                <span>{r.byUser.fullname}</span>
            </li>)}</ul>

        </section>
    )
}