import TextField from '@mui/material/TextField';
import { useState } from "react"


export function ToyMsgAdd({ onSaveToyMsg }) {
    const [MsgTxtToEdit, setMsgTxtToEdit] = useState('')

    function handleChange(ev) {
        setMsgTxtToEdit(ev.target.value)
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onSaveToyMsg(MsgTxtToEdit)
        setMsgTxtToEdit('')
    }

    return (
        <section className="toy-msg-add">
            <form onSubmit={onSubmitForm}>
                <TextField id="outlined-basic" label="Text" variant="outlined" onChange={handleChange} value={MsgTxtToEdit} name="txt" type="text" />
                <button className="btn dark">Save</button>
            </form>

        </section>
    )
}