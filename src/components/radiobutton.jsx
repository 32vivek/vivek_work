import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RadioButton = ({ onChange, value, error }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <FormControl component="fieldset" error={!!error}>
            <FormLabel component="legend" sx={{ color: 'black' }}>Gender</FormLabel>
            <RadioGroup
                row
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButton;
