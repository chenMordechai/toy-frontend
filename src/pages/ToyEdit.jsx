import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { SET_IS_LOADING, UPDATE_TOY } from "../store/reducers/toy.reducer";
import { saveToy } from '../store/actions/toy.actions.js'
import { Label } from "../cpms/Label.jsx";
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { MultiSelectMu } from '../cpms/MultiSelectMu.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { SOCKET_EVENT_TOY_UPDATE, socketService } from '../services/socket.service.js'

export function ToyEdit() {

    const dispatch = useDispatch()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const labels = toyService.getLabels()
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
        socketService.on(SOCKET_EVENT_TOY_UPDATE, toy => {
            dispatch({ type: UPDATE_TOY, toy })
        })

    }, [toyId])

    async function loadToy() {
        try {
            dispatch({ type: SET_IS_LOADING, isLoading: true })
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        } finally {
            dispatch({ type: SET_IS_LOADING, isLoading: false })
        }
    }

    function handleChange(ev) {
        let { value, name, type } = ev.target
        if (type === 'number') value = +value
        else if (type === 'checkbox') value = ev.target.checked
        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function handleLabelChange(ev) {
        let labels = ev.target.value
        console.log('labels:', labels)
        setToyToEdit(prevToy => ({ ...prevToy, labels }))
    }

    async function onSubmitForm(ev) {
        ev.preventDefault()
        try {
            const savedToy = await saveToy({ ...toyToEdit })
            showSuccessMsg('Save Toy: ' + savedToy._id)
            navigate('/toy')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot Save Toy')
        }
    }

  async  function uploadImg(ev) {
       const imgUrl = await utilService.uploadImgToCloudinary(ev)
       setToyToEdit(prevToy => ({ ...prevToy, imgUrl: imgUrl }))
    }

    return (
        <section className="toy-edit">
            <form onSubmit={onSubmitForm}>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleChange} value={toyToEdit.name} name="name" type="text" />
                <TextField id="outlined-basic" label="Price" variant="outlined" onChange={handleChange} value={toyToEdit.price} name="price" type="number" />
                <FormControlLabel control={<Checkbox name="inStock" checked={(toyToEdit.inStock)} onChange={handleChange} />} label="In Stock?" />
                <MultiSelectMu options={labels} label="Labels" checkedOptions={toyToEdit.labels} handleChange={handleLabelChange} />
                <button className="btn dark">Save</button>
            </form>

            <div className="img-container">
                <Link to="/toy"><FontAwesomeIcon icon={faBackward} /> Back</Link>
                {/* {toyToEdit.imgUrl && <img src={utilService.getAssetSrc(toyToEdit.imgUrl)} />} */}
                {toyToEdit.imgUrl && <img src={toyToEdit.imgUrl} />}
                {!toyToEdit.imgUrl && <label> Upload Toy Image:
                    <input type="file" onChange={uploadImg} />
                </label>}

            </div>
        </section>
    )
}