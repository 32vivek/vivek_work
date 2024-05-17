import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RadioButton = ({ onChange, value, error, style, checked, formErrors, options, label }) => {

    // const handleChange = (event) => {
    //     onChange(event.target.value);
    // };

    return (
        <FormControl component="fieldset" error={!!error}>
            {/* <FormLabel component="legend" sx={style}>Gender</FormLabel> */}
            <FormLabel component="legend" sx={style}>{label}
                <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <RadioGroup
                row
                value={value}
                onChange={onChange}
                option={options}


            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButton;
