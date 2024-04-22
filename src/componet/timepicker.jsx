import * as React from 'react';
import { useState } from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';

export default function TimePickerViewRenderers({ formValues, label, handleInputChange, name, error, size }) {

    const [selectedTime, setSelectedTime] = useState(formValues[name]);

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        handleInputChange({ target: { name, value: time } });
    };

    return (
        <div>
            <FormControl fullWidth error={!!error}>
                <TextField
                    label={label}
                    type="time"
                    size={size}
                    error={!!error}
                    value={selectedTime}
                    onChange={(e) => {
                        handleTimeChange(e.target.value);
                    }}
                />

                {error && (
                    <FormHelperText>{error}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}
