import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function MyCheckbox({ label, checked, onChange, value }) {
    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} />}
            label={label}
            value={value}
        />
    );
}
export default MyCheckbox;
