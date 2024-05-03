import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

export default function Dropdown({ options, handleInputChange, name, formValues, label, error, defaultOption, size }) {
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        setSelectedValue(formValues[name] || defaultOption || '');
        // console.log("formsvalue", formValues);
    }, [formValues[name], defaultOption]);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);

        handleInputChange({ target: { name, value: selectedValue } });
    };
    // console.log(selectedValue, "value")
    return (
        <div>
            <FormControl fullWidth variant="standard" error={error}>
                <InputLabel htmlFor={`${name}-select`} style={{ color: 'black' }}>
                    {/* <InputLabel htmlFor={`${name}-select`}> */}
                    {label}<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                    id={`${name}-select`}
                    value={selectedValue}
                    onChange={handleChange}
                    label={label}
                    size={size}
                >
                    {defaultOption && (
                        <MenuItem value={defaultOption}>
                            {defaultOption}
                        </MenuItem>
                    )}
                    {options && options.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                {error && <FormHelperText>Please select an option</FormHelperText>}
            </FormControl>
        </div>
    );
}
