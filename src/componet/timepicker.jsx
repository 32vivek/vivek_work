import * as React from 'react';
import { useState } from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';

export default function TimePickerViewRenderers({ formValues, label, handleInputChange, name, error }) {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        handleInputChange({ target: { name, value: time } });
    };

    return (
        <div>
            <FormControl fullWidth error={!!error}>
                <TextField
                    fullWidth
                    // size="small"
                    label={label}
                    type="time"
                    size="small"
                    error={!!error}
                    value={selectedTime}
                    onChange={(e) => {
                        setSelectedTime(e.target.value);
                        handleInputChange({ target: { name, value: e.target.value } });
                    }}
                // InputLabelProps={{
                //     shrink: true,
                // }}
                // inputProps={{
                //     step: 300,
                // }}
                />
                {error && (
                    <FormHelperText>{error}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}
