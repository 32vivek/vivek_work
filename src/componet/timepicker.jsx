import * as React from 'react';
import { useState } from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';

export default function TimePickerViewRenderers({ formValues, label, handleInputChange, name, error, placeholder }) {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        handleInputChange({ target: { name, value: time } });
    };

    return (
        <div>
            <FormControl fullWidth error={!!error}>
                <TextField
                    // fullWidth
                    // size="small"
                    label={label}
                    // placeholder={placeholder}
                    type="time"
                    size="small"
                    error={!!error}
                    value={selectedTime}
                    onChange={(e) => {
                        setSelectedTime(e.target.value);
                        handleInputChange({ target: { name, value: e.target.value } });
                    }}
                />
                {error && (
                    <FormHelperText>{error}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}
