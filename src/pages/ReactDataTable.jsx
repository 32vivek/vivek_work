import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo } from '../React-Redux/reduxSlicer';
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import SideBar from '../componet/sidebar/sidebar';
import Grid from '@mui/material/Grid';
import { Box, FormControl, InputAdornment, TextField } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import SearchIcon from "@material-ui/icons/Search";

const UserTable = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector(state => state.todo);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setFilteredData(data);
        }
    }, [data]);

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        const filtered = data.filter(item =>
            (item.workingType && item.workingType.toLowerCase().includes(keyword)) ||
            (item.moduleName && item.moduleName.toLowerCase().includes(keyword)) ||
            (item.departmentName && item.departmentName.toLowerCase().includes(keyword)) ||
            (item.holiday && item.holiday.toLowerCase().includes(keyword)) ||
            (item.fromDay && item.fromDay.toLowerCase().includes(keyword)) ||
            (item.toDay && item.toDay.toLowerCase().includes(keyword)) ||
            (typeof item.fromTime === 'string' && item.fromTime.toLowerCase().includes(keyword)) ||
            (typeof item.toTime === 'string' && item.toTime.toLowerCase().includes(keyword))
        );
        setFilteredData(filtered);
    };

    const columns = [
        {
            name: "Working Type",
            selector: row => row.workingType,
            sortable: true,
            cell: row => {
                let color = '#000';
                switch (row.workingType) {
                    case 'SS':
                        color = '#ff0000';
                        break;
                    case 'SA':
                        color = '#00ff00';
                        break;
                    case 'AA':
                        color = '#0000ff';
                        break;
                    case 'AS':
                        color = '#ff00ff';
                        break;
                    default:
                        break;
                }
                return <div style={{ color }}>{row.workingType}</div>;
            }
        },
        {
            name: "Module Name",
            selector: row => row.moduleName,
            sortable: true,
        },
        {
            name: "Department Name",
            selector: row => row.departmentName,
            sortable: true,
        },
        {
            name: "Holiday",
            selector: row => row.holiday,
            sortable: true,
            cell: row => {
                let symbol = '';
                let color = '#000';
                switch (row.holiday) {
                    case 'yes':
                        symbol = '✓';
                        color = '#00ff00';
                        break;
                    case 'no':
                        symbol = '✗';
                        color = '#ff0000';
                        break;
                    default:
                        break;
                }
                return <div style={{ color }}>{symbol}</div>;
            }
        },
        {
            name: "From Day",
            selector: row => row.fromDay,
            sortable: true,
        },
        {
            name: "To Day",
            selector: row => row.toDay,
            sortable: true,
        },
        {
            name: "From Time",
            selector: row => row.fromTime,
            sortable: true,
        },
        {
            name: "To Time",
            selector: row => row.toTime,
            sortable: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: '	#D3D3D3',
            },
        },
        pagination: {
            style: {
                fontWeight: 'bold',
                position: 'sticky',
                // padding: '5px', // Adjust the padding
                // fontSize: '22px', // Adjust the font size

                // height: '20px',
                // backgroundColor: '	#D3D3D3',
            }
        }
    };

    return (
        <div>
            <Grid container>
                <SideBar />
                <Grid item xs={12} md={9} lg={10} style={{ marginLeft: "auto", marginRight: "auto", marginTop: '100px' }}>
                    <Paper elevation={5} style={{ padding: '10px', maxHeight: '400px', overflow: 'auto' }}>
                        <FormControl>
                            <TextField
                                label="Search"
                                variant="outlined"
                                size='small'
                                onChange={handleSearch}
                                style={{ marginBottom: '15px', width: '70%', size: '20px' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                defaultSortField="moduleName"
                                sortIcon={<SortIcon />}
                                dense
                                customStyles={customStyles}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 50]} // Adjusted pagination options
                                highlightOnHover
                                striped
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default UserTable;
