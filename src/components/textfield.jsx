import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const Texxt = ({ variant, type, handleInputChange, error, label, placeholder, name, style, value }) => {
    const isOptionalField = name === 'qualification' || name === 'address';
    const isFullNameField = name === 'fullname';
    const isRequired = !isOptionalField;

    return (
        <FormControl fullWidth>
            <TextField
                InputProps={{ readOnly: isFullNameField }}
                id={name}
                label={<span style={{ color: 'black' }}>{label}{isRequired && <span style={{ color: 'red' }}>*</span>}</span>}
                size="small"
                placeholder={placeholder}
                name={name}
                variant={variant}
                style={style}
                type={type}
                value={value}
                onChange={handleInputChange}
                error={!!error}
                helperText={error}
            />
        </FormControl>
    );
};

export default Texxt;
