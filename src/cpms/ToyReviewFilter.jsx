import * as React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { toyService } from "../services/toy.service"
import { Label } from './Label.jsx'
import { MultiSelectMu } from './MultiSelectMu.jsx'
import { SelectMu } from "./SelectMu"

import { Link, useNavigate, useParams } from "react-router-dom"


export function ToyReviewFilter({ filterBy, onSetFilterBy, sortBy, onSetSortBy, }) {

    return (
        <section className="toy-filter">
            <form >
                <TextField id="outlined-basic" label="Text" variant="outlined" onChange={onSetFilterBy} value={filterBy.txt} name="txt" type="text" />
                <SelectMu handleChange={onSetSortBy} name="type" value={sortBy.type} label="Sort by" options={['Text']} values={['txt']} />
                <FormControlLabel control={<Checkbox name="desc" checked={(sortBy.desc === -1)} onChange={onSetSortBy} />} label="Descending" />
            </form>

        </section>
    )
}