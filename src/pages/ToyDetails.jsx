import { useEffect ,useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward,faComments } from '@fortawesome/free-solid-svg-icons'
import { SET_IS_LOADING } from "../store/reducers/toy.reducer";
import { loadToy, saveToyMsg, removeToyMsg } from '../store/actions/toy.actions.js'
import { loadReviews, resetFilterBy, saveReview, setFilterBy, removeReview } from '../store/actions/review.actions.js'
import { ToyMsgAdd } from "../cpms/ToyMsgAdd"
import { ToyMsgList } from "../cpms/ToyMsgList.jsx"
import { ToyReviewAdd } from "../cpms/ToyReviewAdd"
import { ToyReviewList } from "../cpms/ToyReviewList.jsx"
import { ChatRoom } from "../cpms/ChatRoom.jsx"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyDetails() {

    const dispatch = useDispatch()
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const { currToy: toy } = useSelector(storeState => storeState.toyModule)
    const { reviews } = useSelector(storeState => storeState.reviewModule)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const [isChatOpen, setIsChatOpen] = useState(true)

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
          const savedMsg=  await saveToyMsg(msg, toy._id)
            showSuccessMsg('Save msg: ' + savedMsg.id)
        } catch (err) {
            console.log('Had issues in save msg', err)
            showErrorMsg('Cannot Save msg')
        }
    }
    
    async function onRemoveToyMsg(msgId) {
        try {
            await removeToyMsg(msgId, toy._id)
            showSuccessMsg('Remove msg: ' + msgId)
        } catch (err) {
            console.log('Had issues in remove msg', err)
            showErrorMsg('Cannot Remove msg: ' + msgId)
        }
    }
    
    async function onSaveReview(review) {
        review = { ...review, aboutToyId: toy._id }
        try {
          const savedReview= await saveReview(review)
            showSuccessMsg('Save review: '+savedReview._id)
        } catch (err) {
            console.log('Had issues in save review', err)
            showErrorMsg('Cannot Save review' )
        }
    }
    
    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Remove review: ' + reviewId)
        } catch (err) {
            console.log('Had issues in remove review', err)
            showErrorMsg('Cannot Remove review:' )
        }
    }

    function onCloseChat(){
        setIsChatOpen(false)
    }
    function onOpenChat(){
        setIsChatOpen(true)
    }

    return (
        <section >
            {isLoading && 'Loading...'}
            {!isLoading && toy &&
                (<section className="toy-details">
                    <section className="icons-container">
                 <Link to="/toy"><FontAwesomeIcon icon={faBackward} /> Back</Link>
                <button className="btn"> <FontAwesomeIcon onClick={onOpenChat} icon={faComments} /></button>
              {  isChatOpen && <ChatRoom onCloseChat={onCloseChat} topic={toy._id} />}
                    </section>
                    <section className="details-container" >
                        <div >
                            <h4>{toy.name}</h4>
                            <h4>$ {toy.price}</h4>
                            <h4>{toy.inStock && 'In Stock'}</h4>
                            <ul>
                                {toy.labels.map((l, i) => <li key={i}>{l} {(i < toy.labels.length-1 )? ',': ''}</li>)}
                            </ul>
                        </div>
                        <div className="img-container">
                            <img src={`/src/assets/img/${toy.imgId}.png`} alt="" />
                        </div>
                    </section>

                    <section className="msgs-container">
                    <div >
                        <h3>Reviews:</h3>
                        <ToyReviewList reviews={reviews} onRemoveReview={onRemoveReview} loggedinUser={loggedinUser} />
                        {loggedinUser &&<ToyReviewAdd onSaveReview={onSaveReview} />}
                    </div>
                    <div>
                        <h3>Messages:</h3>
                        <ToyMsgList msgs={toy.msgs} onRemoveToyMsg={onRemoveToyMsg} loggedinUser={loggedinUser} />
                       {loggedinUser&& <ToyMsgAdd onSaveToyMsg={onSaveToyMsg} />}
                    </div>
                    </section>
                </section>)}
        </section>
    )
}