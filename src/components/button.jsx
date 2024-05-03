import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';

const Buttton = ({ onClick, name, style, size, color }) => {
    return (

        // <div style={{ marginBottom: '30px' }}>
        <FormControl>
            <Button
                variant="contained"
                onClick={onClick}
                style={style}
                color={color}
                sx={{
                    borderRadius: '15px',
                    ...style
                }}
                size={size}
            // sx={{
            //     transform: 'perspective(500px) rotateY(45deg)'
            // }}
            >
                {name}
            </Button>
        </FormControl>

        // </div>

    );
};

export default Buttton;
