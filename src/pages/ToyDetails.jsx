
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward} from '@fortawesome/free-solid-svg-icons'

import { SET_IS_LOADING } from "../store/reducers/toy.reducer";


export function ToyDetails() {

    const dispatch = useDispatch()

    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const [toy, setToy] = useState(null)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        dispatch({ type: SET_IS_LOADING, isLoading: true })
        toyService.getById(toyId)
            .then(setToy)
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
            .finally(() => {
                dispatch({ type: SET_IS_LOADING, isLoading: false })
            })
    }

    return (
        <section >
            {isLoading && 'Loading...'}
            {!isLoading && toy &&
                (<section className="toy-details">
                    <div className="details-container">
                    <h4>{toy.name}</h4>
                    {/* <h4>Id: {toy._id}</h4> */}
                    <h4>$ {toy.price}</h4>
                    <h4>{toy.inStock && 'In Stock'}</h4>
                    {/* <h4>Labels:</h4> */}
                    <ul>
                    {toy.labels.map((l,i)=><li key={i}>{l},</li>)}
                    </ul>
                    </div>
                    <div className="img-container">
                    <Link to="/toy"><FontAwesomeIcon icon={faBackward} /> Back</Link>
                    <img src={`/src/assets/img/${toy.imgId}.png`} alt="" />
                    </div>
                </section>)}

        </section>
    )
}