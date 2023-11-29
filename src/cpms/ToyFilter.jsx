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
import { MultiSelectMu } from './MultiSelectMu.jsx'
import { SelectMu } from "./SelectMu"

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate, useParams } from "react-router-dom"


export function ToyFilter({ filterBy, onSetFilterBy, handleLabelChange, labelsToShow, sortBy, onSetSortBy }) {
   
    return (
        <section className="toy-filter">
            <form >
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={onSetFilterBy} value={filterBy.name} name="name" type="text"/>
                    {/* <input onChange={onSetFilterBy} value={filterBy.name} type="text" id="name" name="name" /> */} 
                    <TextField id="outlined-basic" label="Max Price" variant="outlined" onChange={onSetFilterBy} value={filterBy.price}  name="price" type="number"/>
                    {/* <input onChange={onSetFilterBy} value={filterBy.price} type="number" id="price" name="price" /> */}
                    <SelectMu handleChange={onSetFilterBy} name="inStock" value={filterBy.inStock}  label="In Stock" options={['All','In Stock','Not In Stock']} values={['all','inStock','notInStock']}/>
                    {/* <select onChange={onSetFilterBy} name="inStock" id="inStock" value={filterBy.inStock}>
                        <option value="all">All</option>
                        <option value="inStock">In Stock</option>
                        <option value="notInStock">Not In Stock</option>
                    </select> */}
                    <MultiSelectMu options={labelsToShow} label="Labels" checkedOptions={filterBy.labels} handleChange={handleLabelChange} />
                    {/* <ul className="labels">
                        {labelsToShow.map((label, idx) =>
                            <Label key={idx} labels={filterBy.labels} label={label} idx={idx} handleLabelChange={handleLabelChange} />)}
                    </ul> */}
                <SelectMu handleChange={onSetSortBy} name="type" value={sortBy.type}   label="Sort by" options={['Name','Price','Created At']} values={['name','price','createdAt']} />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

                <Link className="btn dark" to="/toy/edit">Add New Toy</Link>

            </form>


        </section>
    )
}