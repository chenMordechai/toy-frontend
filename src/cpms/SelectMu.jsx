import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function SelectMu({label , options , values , name , value , handleChange}) {
    return (
        <Box >
            <FormControl >
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={handleChange}
                    name={name}
                >
                    {options.map((option,idx)=> <MenuItem key={idx} value={values[idx]}>{option}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}