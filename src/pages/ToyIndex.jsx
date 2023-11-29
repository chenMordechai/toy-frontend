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
    // const [isFilterOpen, setisFilterOpen] = useState(false)

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

    function onSetFilterBy(name, value) {
        setFilterBy({ name: value })
        // setFilterByToEdit(prevFilter => ({...prevFilter , [name]:value}))

    }

    function onSetSortBy(name, value) {
        setSortBy({ name: value })
        // setSortByToEdit(prevSort => ({...prevSort , [name] : value}))
    }
    function handleLabelChange(ev) {
        let { name, checked } = ev.target
        setLabels({ name, checked })
    }
    function onToggleFilter() {
        setisFilterOpen(prev => !prev)
    }


    // function onSetLabels(name, checked) {

    //     // if (checked) {
    //     //     setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: [...prevFilter.labels, name] }))
    //     // } else {
    //     //     setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: prevFilter.labels.filter(l => l !== name) }))
    //     // }
    // }

    return (
        <section className="toy-index">

            {/* <section className="category-container">
              <CategoryList/>
            </section> */}

            <section className="filter-container">
                <section>
                    <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} handleLabelChange={handleLabelChange} labelsToShow={labels} />
                    <ToySort sortBy={sortBy} onSetSortBy={onSetSortBy} />
                    <button><Link to="/toy/edit">Add New Toy</Link></button>
                </section>
                {/* {!isFilterOpen && <section >
                    <div>
                        <h3>Find your best Toys for yor Children</h3>
                        <button className="btn dark" onClick={onToggleFilter}>Get Start</button>
                    </div>
                    <img src={logoUrl} />
                </section>} */}
            </section>

            <section className="list-container">
                {isLoading && 'Loading..'}
                {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
            </section>


        </section>
    )
}