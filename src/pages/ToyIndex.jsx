import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy, setFilterBy, setSortBy, setLabels } from '../store/actions/toy.actions.js'
import {ADD_TOY_TO_CART, ADD_TOY ,REMOVE_TOY } from '../store/reducers/toy.reducer.js'
import { ToyList } from '../cpms/ToyList.jsx'
import { ToyFilter } from '../cpms/ToyFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { SOCKET_EVENT_TOY_ADDED, SOCKET_EVENT_TOY_REMOVED, socketService } from '../services/socket.service.js'


export function ToyIndex() {
    const { toys } = useSelector(storeState => storeState.toyModule)
    const { filterBy } = useSelector(storeState => storeState.toyModule)
    const { sortBy } = useSelector(storeState => storeState.toyModule)
    const { isLoading } = useSelector(storeState => storeState.toyModule)
    const { loggedinUser } = useSelector(storeState => storeState.userModule)
    const labels = toyService.getLabels()
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            loadToys()
            socketService.on(SOCKET_EVENT_TOY_ADDED, toy => {
                dispatch({ type: ADD_TOY, toy })
            })
    
            socketService.on(SOCKET_EVENT_TOY_REMOVED, toyId => {
                dispatch({ type: REMOVE_TOY, toyId })
            })
    
            return () => {
                socketService.off(SOCKET_EVENT_TOY_ADDED)
                socketService.off(SOCKET_EVENT_TOY_REMOVED)
            }
        } catch (err) {
            console.log('err:', err)
        }
    }, [filterBy, sortBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Remove Toy: ' + toyId)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot Remove Toy')
        }
    }

    function onSetFilterBy(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'number') value = +value
        else if (type === 'checkbox') value = checked
        setFilterBy({ [name]: value })
    }

    function onSetSortBy(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'checkbox') value = (checked) ? -1 : 1
        setSortBy({ [name]: value })
    }

    function handleLabelChange(ev) {
        let labels = ev.target.value
        setLabels(labels)
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return (
        <section className="toy-index">

            <section className="filter-container">
                <ToyFilter userIsAdmin={loggedinUser?.isAdmin} filterBy={filterBy} onSetFilterBy={onSetFilterBy} handleLabelChange={handleLabelChange} labelsToShow={labels} sortBy={sortBy} onSetSortBy={onSetSortBy} />
            </section>

            <section className="list-container">
                {isLoading && 'Loading..'}
                {!isLoading && <ToyList loggedinUser={loggedinUser}  toys={toys} onRemoveToy={onRemoveToy} addToCart={addToCart} />}
            </section>


        </section>
    )
}