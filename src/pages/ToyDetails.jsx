
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

import { SET_IS_LOADING } from "../store/reducers/toy.reducer";
import { loadToy, saveToyMsg, removeToyMsg } from '../store/actions/toy.actions.js'
import { loadReviews, resetFilterBy, saveReview, setFilterBy, removeReview } from '../store/actions/review.actions.js'
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
        try {
            await saveToyMsg(msg, toy._id)
        } catch (err) {
            console.log('Had issues in save msg', err)
        }
    }

    async function onRemoveToyMsg(msgId) {
        try {
            await removeToyMsg(msgId, toy._id)
        } catch (err) {
            console.log('Had issues in remove msg', err)
        }
    }

    async function onSaveReview(review) {
        review = { ...review, aboutToyId: toy._id }
        try {
            await saveReview(review)
        } catch (err) {
            console.log('Had issues in save review', err)
        }
    }

    async function onRemoveReview(reviewId) {
        console.log('onRemoveReview', reviewId)
        try {
            await removeReview(reviewId)
        } catch (err) {
            console.log('Had issues in remove review', err)
        }
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
                    <section className="msgs-container">

                    <section >
                        <h3>Reviews:</h3>
                        <ToyReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
                        <ToyReviewAdd onSaveReview={onSaveReview} />
                    </section>
                    <section>
                        <h3>Messages:</h3>
                        <ToyMsgList msgs={toy.msgs} onRemoveToyMsg={onRemoveToyMsg} />
                        <ToyMsgAdd onSaveToyMsg={onSaveToyMsg} />
                    </section>
                    </section>
                </section>)}
        </section>
    )
}