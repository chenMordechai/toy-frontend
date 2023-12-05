
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

import { SET_IS_LOADING } from "../store/reducers/toy.reducer";
import { loadToy, saveToyMsg } from '../store/actions/toy.actions.js'
import { loadReviews, resetFilterBy, saveReview, setFilterBy } from '../store/actions/review.actions.js'
import { ToyMsgAdd } from "../cpms/ToyMsgAdd"
import { ToyMsgList } from "../cpms/ToyMsgList.jsx"
import { ToyReviewAdd } from "../cpms/ToyReviewAdd"
import { ToyReviewList } from "../cpms/ToyReviewList.jsx"


export function ToyDetails() {

    const dispatch = useDispatch()

    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    // const [toy, setToy] = useState(null)
    const { currToy: toy } = useSelector(storeState => storeState.toyModule)
    const { reviews } = useSelector(storeState => storeState.reviewModule)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        init()
    }, [toyId])

    async function init() {
        try {
            await loadToy(toyId)
            resetFilterBy()
            setFilterBy({ aboutToyId: toyId })
            loadReviews()
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    async function onSaveToyMsg(msg) {
        saveToyMsg(msg, toy._id)
    }
    async function onSaveReview(review) {
        review = { ...review, aboutToyId: toy._id }
        await saveReview(review)
        await loadReviews()
    }

    return (
        <section >
            {isLoading && 'Loading...'}
            {!isLoading && toy &&
                (<section className="toy-details">
                    <section className="details-container" >
                        <div >
                            <h4>{toy.name}</h4>
                            {/* <h4>Id: {toy._id}</h4> */}
                            <h4>$ {toy.price}</h4>
                            <h4>{toy.inStock && 'In Stock'}</h4>
                            {/* <h4>Labels:</h4> */}
                            <ul>
                                {toy.labels.map((l, i) => <li key={i}>{l},</li>)}
                            </ul>
                        </div>
                        <div className="img-container">
                            <Link to="/toy"><FontAwesomeIcon icon={faBackward} /> Back</Link>
                            <img src={`/src/assets/img/${toy.imgId}.png`} alt="" />
                        </div>
                    </section>
                    <section className="reviews-container">
                        <h3>Reviews:</h3>
                        <ToyReviewAdd onSaveReview={onSaveReview} />
                        <ToyReviewList reviews={reviews} />
                    </section>
                    <section className="msgs-container">
                        <h3>Messages:</h3>
                        <ToyMsgAdd onSaveToyMsg={onSaveToyMsg} />
                        <ToyMsgList msgs={toy.msgs} />
                    </section>
                </section>)}
        </section>
    )
}