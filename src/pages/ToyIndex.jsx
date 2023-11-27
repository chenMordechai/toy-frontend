import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy ,setFilterBy ,setSortBy , setLabels } from '../store/actions/toy.actions.js'
import { ToyList } from '../cpms/ToyList.jsx'
import { ToyFilter } from '../cpms/ToyFilter.jsx'
import {ToySort} from '../cpms/ToySort.jsx'

export function ToyIndex() {

    const {toys} = useSelector(storeState => storeState.toyModule)
    const {filterBy} = useSelector(storeState => storeState.toyModule)
    const {sortBy} = useSelector(storeState => storeState.toyModule)
    const {isLoading} = useSelector(storeState => storeState.toyModule)
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
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilterBy(name,value){
        setFilterBy({name:value})
                // setFilterByToEdit(prevFilter => ({...prevFilter , [name]:value}))

    }
    function onSetLabels(name, checked) {
        setLabels({name,checked})
        // if (checked) {
        //     setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: [...prevFilter.labels, name] }))
        // } else {
        //     setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: prevFilter.labels.filter(l => l !== name) }))
        // }
    }

    function onSetSortBy(name,value){
        setSortBy({name:value})
        // setSortByToEdit(prevSort => ({...prevSort , [name] : value}))
    }

    return (
        <section className="toy-index">
            <h2>Toy Index</h2>
            <button><Link to="/toy/edit">Add New Toy</Link></button>

            <ToyFilter onSetLabels={onSetLabels} labelsToShow={labels} filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
            <ToySort sortBy={sortBy} onSetSortBy={onSetSortBy}/>

            {isLoading && 'Loading..'}
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}


        </section>
    )
}