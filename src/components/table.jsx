import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './table.css';

const DataTable = ({ data, pagination, globalFilter, handleGlobalFilterChange, handleSortChange, handleChangePage, handleChangeRowsPerPage }) => {
    const { page, rowsPerPage, totalCount } = pagination;
    const { sortBy, sortOrder } = data;

    return (
        <Paper elevation={8} style={{ padding: '10px', margin: 'auto', marginBottom: '20px' }}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TextField
                    label="Search"
                    size='small'
                    variant="filled"
                    value={globalFilter}
                    onChange={handleGlobalFilterChange}
                    style={{ marginBottom: '50px', width: "150px", height: '15px' }}
                />
            </Box>
            <TableContainer component={Box} style={{}}>
                <Table size="small">
                    <TableHead>
                        <TableRow bgcolor="#2070D2">
                            <TableCell style={{ fontWeight: 'bold', fontSize: '14px', color: 'white' }}>SR. N.</TableCell>
                            <TableCell
                                style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', padding: '5px', position: 'relative', color: 'white' }}
                                onClick={() => handleSortChange('country')}
                            >
                                COUNTRY
                                {sortBy === 'country' && (
                                    <span className="sorting-arrow" style={{ color: 'red' }}>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                                )}
                            </TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell style={{ fontSize: '14px' }}>{row.id}</TableCell>
                                <TableCell style={{ fontSize: '14px' }}>{row.country}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                // style={{ height: '20px' }}
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={250}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default DataTable;
