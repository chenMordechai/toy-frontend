import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy, setFilterBy, setSortBy, setLabels } from '../store/actions/toy.actions.js'
import { ToyList } from '../cpms/ToyList.jsx'
import { ToyFilter } from '../cpms/ToyFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export function ToyIndex() {

    const { toys } = useSelector(storeState => storeState.toyModule)
    const { filterBy } = useSelector(storeState => storeState.toyModule)
    const { sortBy } = useSelector(storeState => storeState.toyModule)
    const { isLoading } = useSelector(storeState => storeState.toyModule)
    const labels = toyService.getLabels()
    const { loggedinUser } = useSelector(storeState => storeState.userModule)

    useEffect(() => {
        try {
            loadToys()
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

    return (
        <section className="toy-index">

            <section className="filter-container">
                <ToyFilter UserIsAdmin={loggedinUser?.isAdmin} filterBy={filterBy} onSetFilterBy={onSetFilterBy} handleLabelChange={handleLabelChange} labelsToShow={labels} sortBy={sortBy} onSetSortBy={onSetSortBy} />
            </section>

            <section className="list-container">
                {isLoading && 'Loading..'}
                {!isLoading && <ToyList UserIsAdmin={loggedinUser?.isAdmin} toys={toys} onRemoveToy={onRemoveToy} />}
            </section>


        </section>
    )
}