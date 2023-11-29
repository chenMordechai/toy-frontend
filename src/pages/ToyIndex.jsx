import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy, setFilterBy, setSortBy, setLabels } from '../store/actions/toy.actions.js'
import { ToyList } from '../cpms/ToyList.jsx'
import { ToyFilter } from '../cpms/ToyFilter.jsx'
import { ToySort } from '../cpms/ToySort.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { CategoryList } from '../cpms/CategoryList.jsx'
import logoUrl from '../assets/img/logo.png'


export function ToyIndex() {

    const { toys } = useSelector(storeState => storeState.toyModule)
    const { filterBy } = useSelector(storeState => storeState.toyModule)
    const { sortBy } = useSelector(storeState => storeState.toyModule)
    const { isLoading } = useSelector(storeState => storeState.toyModule)
    // const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    // console.log('filterByToEdit:', filterByToEdit)
    const labels = toyService.getLabels()

    // const [sortByToEdit, setSortByToEdit] = useState(toyService.getDefaultSort())

    useEffect(() => {
        // console.log('sortByToEdit:', sortByToEdit)
        // console.log('filterByToEdit:', filterByToEdit)
        loadToys()
            .catch(err => {
                console.log('err:', err)
            })
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Remove Toy: ' + toyId)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot Remove Toy')
            })
    }

    function onSetFilterBy(ev) {
        let { name, value, type, checked } = ev.target
        console.log('name, value, type, checked:', name, value, type, checked)
        if (type === 'number') value = +value
        else if (type === 'checkbox') value = checked
        setFilterBy({ [name]: value })
        // setFilterByToEdit(prevFilter => ({...prevFilter , [name]:value}))

    }

    function onSetSortBy(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'checkbox') value = (checked) ? -1 : 1
        setSortBy({ [name]: value })
        // setSortByToEdit(prevSort => ({...prevSort , [name] : value}))
    }


    function handleLabelChange(ev) {
        // console.log('ev:', ev)
        // let { name, checked } = ev.target
        let labels = ev.target.value
        console.log('labels:', labels)
        setLabels(labels)
    }

    return (
        <section className="toy-index">

            {/* <section className="category-container">
              <CategoryList/>
            </section> */}

            <section className="filter-container">

                <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} handleLabelChange={handleLabelChange} labelsToShow={labels}  sortBy={sortBy} onSetSortBy={onSetSortBy} />
                    {/* <ToySort sortBy={sortBy} onSetSortBy={onSetSortBy} /> */}
                    {/* <Link className="btn dark" to="/toy/edit">Add New Toy</Link> */}
            </section>

            <section className="list-container">
                {isLoading && 'Loading..'}
                {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
            </section>


        </section>
    )
}