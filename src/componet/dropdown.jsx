import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import { FormHelperText } from '@mui/material';

function Dropdown({ placeholder, options, name, handleInputChange, formValues, error, label, size }) {
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        // console.log("Form Values:", formValues);
        setSelectedValue(formValues[name] || '');
    }, [formValues[name]]);


    const handleChange = (event) => {
        const selectedValue = event.target.value;
        // console.log("Selected Value before update:", selectedValue);
        setSelectedValue(selectedValue);
        handleInputChange({ target: { name, value: selectedValue } });
        // console.log("Selected Value after update:", selectedValue);
    };

    // console.log("Render: Selected Value:", selectedValue);


    return (
        <div>
            <FormControl fullWidth error={error}>
                <Select
                    value={selectedValue}
                    onChange={handleChange}
                    label={label}
                    displayEmpty
                    size={size}
                // size="small"
                >
                    <MenuItem value="" disabled>
                        {placeholder} <span style={{ color: 'red' }}>*</span>
                    </MenuItem>
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

export default Dropdown;
