
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

import { SET_IS_LOADING } from "../store/reducers/toy.reducer";
import { saveToy } from '../store/actions/toy.actions.js'
import { Label } from "../cpms/Label.jsx";

export function ToyEdit() {

    const dispatch = useDispatch()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const labels = toyService.getLabels()
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()

    }, [toyId])

    function loadToy() {
        dispatch({ type: SET_IS_LOADING, isLoading: true })
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
            .finally(() => {
                dispatch({ type: SET_IS_LOADING, isLoading: false })
            })
    }

    function handleChange(ev) {
        let { value, name, type } = ev.target
        if (type === 'number') value = +value
        else if (type === 'checkbox') value = ev.target.checked

        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function handleLabelChange(ev) {
        let { name, checked } = ev.target
        if (checked) {
            setToyToEdit(prevToy => ({ ...prevToy, labels: [...prevToy.labels, name] }))
        } else {
            setToyToEdit(prevToy => ({ ...prevToy, labels: prevToy.labels.filter(l => l !== name) }))
        }
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        console.log('toyToEdit:', toyToEdit)
        saveToy({ ...toyToEdit })
            .then(() => {
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
            })
    }


    return (
        <section className="toy-edit">
            <h2>Toy Edit</h2>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={toyToEdit.name} type="text" id="name" name="name" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={toyToEdit.price} type="number" id="price" name="price" />

                <label htmlFor="inStock">In Stock?</label>
                <input onChange={handleChange} checked={toyToEdit.inStock} type="checkbox" id="instock" name="inStock" />

                <div>
                    Labels:
                </div>
                <ul className="labels">
                    {labels.map((label, idx) =>
                        <Label key={idx} labels={toyToEdit.labels} label={label} idx={idx} handleLabelChange={handleLabelChange} />)}
                </ul>

                <button>Save</button>
            </form>

            <button><Link to="/toy">Back</Link></button>
        </section>
    )
}