import { toyService } from "../services/toy.service"
import { SelectMu } from "./SelectMu"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function ToySort({ sortBy, onSetSortBy }) {

    function handleChange(ev) {
        let { name, value, type, checked } = ev.target
        if (type === 'checkbox') value = (checked) ? -1 : 1
        onSetSortBy(name, value)
    }

    return (
        <section className="toy-sort">
            <form >
                <SelectMu />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
            </form>
        </section >
    )
}