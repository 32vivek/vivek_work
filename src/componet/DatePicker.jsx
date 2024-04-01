import * as React from 'react';
import { useState } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { FormControl } from '@mui/material';
export default function DatePickerView({ name, formValues, handleInputChange, workingType }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleInputChange({ target: { name, value: date } });
    };

    return (
        <div style={{ marginLeft: '150px' }}>
            <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box>
                        <DemoItem>
                            <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                slotProps={{
                                    field: { clearable: true, onClear: () => setSelectedDate(null) },
                                }}
                            // disabled={workingType === "AA" || workingType === "AS" || workingType === "SS"}
                            />
                        </DemoItem>
                    </Box>
                </LocalizationProvider>
            </FormControl>
        </div>
    );
}
