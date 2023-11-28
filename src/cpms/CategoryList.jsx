
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'

import { CategoryPreview } from './CategoryPreview.jsx'
import { toyService } from '../services/toy.service.js'


export function CategoryList(){
    const [isFullCatgory, setisFullCatgory] = useState(false)
    const categories = toyService.getCategories()
    const categoriesIcons = toyService.getCategoriesIcons()

    function toggleCategory(){
        setisFullCatgory(prev => !prev)
    }
    return (
        <section className="category-list">
              <h3>
                    Category
                </h3>
                {isFullCatgory && <ul className="category-full">
                    {categories.map((category, idx) =>
                        <CategoryPreview key={idx} category={category}  idx={idx} />)}
                </ul> }
                  {!isFullCatgory &&  <ul className="category-part">
                    {categories.filter((category,idx)=> idx < 3).map((category, idx) =>
                        <CategoryPreview key={idx} category={category}idx={idx}  />)}
                </ul> }
                <button className="btn light" onClick={toggleCategory}>
                    see {isFullCatgory?'less':'all'}
                    <FontAwesomeIcon icon={faArrowRight} />
                    </button>
               
        </section>
    )
}