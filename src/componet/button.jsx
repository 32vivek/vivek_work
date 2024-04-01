import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';

const Buttton = ({ onClick, name }) => {
    return (

        <div style={{ marginLeft: '150px', marginBottom: '30px' }}>
            <FormControl>
                <Button variant="contained" onClick={onClick}>{name}</Button>
            </FormControl>
        </div>

    );
};

export default Buttton;
