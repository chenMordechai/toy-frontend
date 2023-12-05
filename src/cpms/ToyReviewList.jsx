import {  useParams } from "react-router-dom"
import { useEffect , useState } from "react"



export function ToyReviewList({ reviews }) {
    const [isReviewPage, setIsReviewPage] = useState(false)

    const params  = useParams()
    
    useEffect(() => {
        if(!params.toyId){
            setIsReviewPage(()=> true)
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