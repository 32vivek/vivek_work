import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Autocmp = ({ data, options, value, label, onChange, size, variant, placeholder }) => {
    return (
        <Autocomplete
            value={value || null}
            size={size}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            options={data || options}
            renderInput={(params) => <TextField {...params} variant={variant} label={label} placeholder={placeholder} InputLabelProps={{ style: { color: 'black' } }} />}
        />
    );
}
export default Autocmp;
