import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
// import SideBar from '../component/sidebar/sidebar';
// import DataTable from '../component/table';
import DataTable from './../componet/table';
// import SideBar
import SideBar from './../componet/sidebar/sidebar';

const DataCountry = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        rowsPerPage: 10,
        totalCount: 0
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const loadData = async () => {
        try {
            const response = await axios.get(`http://192.168.1.2:8083/country`, {
                params: {
                    page: pagination.page,
                    pageLength: pagination.rowsPerPage,
                    globalFilter,
                    sortBy,
                    sortOrder,
                }
            });

            let filteredData = response.data.data;

            // Filtering
            if (globalFilter) {
                filteredData = filteredData.filter(item =>
                    Object.values(item).some(value =>
                        String(value).toLowerCase().includes(globalFilter.toLowerCase())
                    )
                );
            }

            // Sorting
            if (sortBy === 'country') {
                filteredData.sort((a, b) => {
                    const aValue = a.country.toLowerCase();
                    const bValue = b.country.toLowerCase();
                    return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                });
            }

            setData(filteredData);

            const totalCount = filteredData.length;
            setPagination(prevPagination => ({
                ...prevPagination,
                totalCount: totalCount
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, [pagination.page, pagination.rowsPerPage, globalFilter, sortBy, sortOrder]);

    const handleSortChange = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: newPage
        }));
    };

    const handleChangeRowsPerPage = (event) => {
        const rowsPerPage = parseInt(event.target.value, 10);
        setPagination(prevPagination => ({
            ...prevPagination,
            rowsPerPage: rowsPerPage,
            page: 0
        }));
    };

    const handleGlobalFilterChange = (event) => {
        setGlobalFilter(event.target.value);
    };

    return (
        <Grid container style={{ marginTop: '100px' }}>
            <SideBar />
            <DataTable
                data={data}
                pagination={pagination}
                globalFilter={globalFilter}
                handleGlobalFilterChange={handleGlobalFilterChange}
                handleSortChange={handleSortChange}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Grid>
    );
}

export default DataCountry;
