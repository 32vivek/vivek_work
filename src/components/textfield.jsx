import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const Texxt = ({ variant, formValues = {}, formErrors = {}, handleInputChange, label, placeholder, name, style, value, onChange }) => {

    const isOptionalField = name === 'qualification' || name === 'address';
    const isFullNameField = name === 'fullname';
    const isRequired = !isOptionalField;

    return (
        <FormControl fullWidth >
            <TextField
                InputProps={{ readOnly: isFullNameField }}
                id={name}
                label={<span style={{ color: 'black' }}>{label}{isRequired && <span style={{ color: 'red' }}>*</span>}</span>}
                size="small"
                placeholder={placeholder}
                name={name}
                variant={variant}
                style={style}
                value={value || formValues[name] || ''}
                // value={value}
                onChange={handleInputChange}
                error={!!formErrors[name]}
                helperText={formErrors[name]}
            />

        </FormControl>
    );
};

export default Texxt;
