import { toyService } from "../services/toy.service"

import {Label} from './Label.jsx'

export function ToyFilter({filterBy , onSetFilterBy , labelsToShow , onSetLabels}) {
   
    function handleChange(ev){
        let {name , value , type , checked} = ev.target
        if(type === 'number') value = +value
        else if(type === 'checkbox') value = checked
        
        onSetFilterBy(name,value)
    }

    function handleLabelChange(ev){
        let {name , checked} = ev.target
        onSetLabels(name , checked)
    }

    
    return (
        <section className="toy-filter">
            <h2>Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={filterBy.name} type="text" id="name" name="name" />

                <label htmlFor="price">Max Price:</label>
                <input onChange={handleChange} value={filterBy.price} type="number" id="price" name="price" />

                <label htmlFor="inStock">In Stock?</label>
                <select onChange={handleChange} name="inStock" id="inStock" value={filterBy.inStock}>
                    <option value="all">All</option>
                    <option value="inStock">In Stock</option>
                    <option value="notInStock">Not In Stock</option>
                </select>
            
                <div>
                    Labels:
                </div>
                <ul className="labels">
                    {labelsToShow.map((label, idx) =>
                        <Label key={idx} labels={filterBy.labels} label={label} idx={idx} handleLabelChange={handleLabelChange} />)}
                </ul>
</form>


        </section>
    )
}