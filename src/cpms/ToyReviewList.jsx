import {  useParams } from "react-router-dom"
import { useEffect , useState } from "react"



export function ToyReviewList({ reviews }) {
    console.log('reviews:', reviews)
    const [isReviewPage, setIsReviewPage] = useState(false)

    const params  = useParams()
    console.log('params:', params)
    
    useEffect(() => {
        if(!params.toyId){
            setIsReviewPage(()=> true)
            console.log('isReviewPage:', isReviewPage)
        }
    }, [])

    return (
        <section className="toy-review-list">
            <ul>{reviews.map(r => <li
                key={r._id}>{r.txt}
                <span>{r.byUser.fullname}</span>
                <span>{isReviewPage && r.aboutToy.name}</span>
            </li>)}</ul>

        </section>
    )
}