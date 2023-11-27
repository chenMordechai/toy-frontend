
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

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
        <section className="toy-details">
            <h2>Toy Details</h2>
            {isLoading && 'Loading...'}
            {!isLoading && toy &&
                (<section>
                    <h2>Name:{toy.name}</h2>
                    <h4>Id:{toy._id}</h4>
                    <h4>{toy.inStock && 'In Stock'}</h4>
                    <h4>Price{toy.price}</h4>
                </section>)}

            <button><Link to="/toy">Back</Link></button>
        </section>
    )
}