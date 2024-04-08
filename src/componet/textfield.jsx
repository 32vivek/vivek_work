import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const Texxt = ({ formValues, formErrors, handleInputChange, label, placeholder, name, style }) => {

    const isOptionalField = name === 'qualification' || name === 'address';
    const isFullNameField = name === 'fullname';
    return (
        <FormControl fullWidth>
            <TextField
                required={!isOptionalField}
                InputProps={{ readOnly: isFullNameField }}
                id={name}
                label={label}
                size="small"

                focused
                // variant="filled"
                placeholder={placeholder}
                // color="primary"
                // focused
                name={name}
                style={style}
                value={formValues[name] || ''}
                onChange={handleInputChange}
                error={!!formErrors[name]}
                helperText={formErrors[name]}

            />
        </FormControl>
    );
};

export default Texxt;
