import TextField from '@mui/material/TextField';
import { useState } from "react"

import { toyService } from "../services/toy.service"


export function ToyMsgAdd({ onSaveToyMsg }) {
    const [MsgTxtToEdit, setMsgTxtToEdit] = useState(toyService.getEmptyMsg())

    function handleChange(ev) {
        setMsgTxtToEdit({txt:ev.target.value})
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onSaveToyMsg(MsgTxtToEdit)
        setMsgTxtToEdit(toyService.getEmptyMsg())
    }

    return (
        <section className="toy-msg-add">
            <form onSubmit={onSubmitForm}>
                <TextField id="outlined-basic" label="Text" variant="outlined" onChange={handleChange} value={MsgTxtToEdit.txt} name="txt" type="text" />
                <button className="btn dark">Save</button>
            </form>

        </section>
    )
}