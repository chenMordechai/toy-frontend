import { toyService } from "../services/toy.service"

export function ToySort({sortBy, onSetSortBy}) {

    function handleChange(ev){
        let {name ,value , type , checked} = ev.target
        if(type === 'checkbox') value = (checked)? -1 : 1
        onSetSortBy(name,value)
    }

    return (
        <section className="toy-sort">
            <h2>Sort</h2>
            <form >
                <label htmlFor="type">Sort By:</label>
                <select onChange={handleChange} name="type" id="type" value={sortBy.type}>
                    <option value=""></option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created</option>
                </select>

                <label htmlFor="desc">Descending?</label>
                <input onChange={handleChange} checked={(sortBy.desc === -1)} type="checkbox" id="desc" name="desc" />

            </form>
        </section>
    )
}