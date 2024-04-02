import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import { FormHelperText } from '@mui/material';

function Dropdown({ placeholder, options, name, handleInputChange, error }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
        handleInputChange({ target: { name, value: selectedValue } });
    };

    return (
        <div>
            <FormControl fullWidth error={error !== null}>
                <Select
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                    size="small"
                // style={{
                //     height: '40px',
                //     fontSize: '0.8rem',
                //     padding: '6px 12px',
                // }}
                >
                    <MenuItem value="" disabled>
                        {placeholder}
                    </MenuItem>
                    {options && options.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                {error && (
                    <FormHelperText>{error}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}

export default Dropdown;
