import * as React from 'react';
import { Box } from '@mui/material';
// import { TextField } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { toyService } from "../services/toy.service"
import { Label } from './Label.jsx'
import { MultiSelect } from './MultiSelect.jsx'
import { SelectMu } from "./SelectMu"

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate, useParams } from "react-router-dom"




export function ToyFilter({ filterBy, onSetFilterBy, handleLabelChange, labelsToShow, sortBy, onSetSortBy }) {
    function handleChange(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'checkbox') value = (checked) ? -1 : 1
        onSetSortBy(name, value)
    }

   
    return (
        <section className="toy-filter">
            <form >
                    <TextField id="outlined-basic" label="Name" variant="outlined" />
                    {/* <label htmlFor="name">Name:</label>
                    <input onChange={onSetFilterBy} value={filterBy.name} type="text" id="name" name="name" /> */}
                    <TextField id="outlined-basic" label="Max Price" variant="outlined" />
                    {/* <label htmlFor="price">Max Price:</label>
                    <input onChange={onSetFilterBy} value={filterBy.price} type="number" id="price" name="price" /> */}
                    <SelectMu />
                    {/* <label htmlFor="inStock">In Stock?</label>
                    <select onChange={onSetFilterBy} name="inStock" id="inStock" value={filterBy.inStock}>
                        <option value="all">All</option>
                        <option value="inStock">In Stock</option>
                        <option value="notInStock">Not In Stock</option>
                    </select> */}
                {/* <div>
                    <h4>Labels:</h4>
                    <ul className="labels">
                        {labelsToShow.map((label, idx) =>
                            <Label key={idx} labels={filterBy.labels} label={label} idx={idx} handleLabelChange={handleLabelChange} />)}
                    </ul>
                </div> */}
                <MultiSelect />
                <SelectMu />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

                <Link className="btn dark" to="/toy/edit">Add New Toy</Link>

            </form>


        </section>
    )
}