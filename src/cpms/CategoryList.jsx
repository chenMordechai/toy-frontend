import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { CategoryPreview } from './CategoryPreview.jsx'
import { toyService } from '../services/toy.service.js'
import { setCategory } from '../store/actions/toy.actions.js'
import { useNavigate } from "react-router-dom"


export function CategoryList() {
    const [isFullCatgory, setisFullCatgory] = useState(false)
    const categories = toyService.getCategories()

    const navigate = useNavigate()

    function onSetCategory(category) {
        let filterBy;
        if (category === 'All') {
            filterBy = { inStock: 'all' }
        } else if (category === 'In Stock') {
            filterBy = { inStock: 'inStock' }
        } else {
            filterBy = { labels: [category] }
        }
        setCategory(filterBy)
        navigate('/toy')

    }
    function toggleCategory() {
        setisFullCatgory(prev => !prev)
    }
    return (
        <section className="category-list">
            <h3>
                Category
            </h3>
            {isFullCatgory && <ul className="category-full">
                {categories.map((category, idx) =>
                    <CategoryPreview key={idx} category={category} idx={idx} onSetCategory={onSetCategory} />)}
            </ul>}
            {!isFullCatgory && <ul className="category-part">
                {categories.filter((category, idx) => idx < 3).map((category, idx) =>
                    <CategoryPreview key={idx} category={category} idx={idx} onSetCategory={onSetCategory} />)}
            </ul>}
            <button className="btn light" onClick={toggleCategory}>
                see {isFullCatgory ? 'less' : 'all'}
                <FontAwesomeIcon icon={faArrowRight} />
            </button>

        </section>
    )
}