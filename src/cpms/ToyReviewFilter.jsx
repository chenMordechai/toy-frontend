import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { Label } from './Label.jsx'
import { MultiSelectMu } from './MultiSelectMu.jsx'
import { SelectMu } from "./SelectMu"

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