import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteItem, updateItem } from "../React-Redux/slice/data";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Grid from "@mui/material/Grid";
import { Paper, Button, Typography } from "@mui/material";
import { Box, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@mui/icons-material";
import LinearProgress from '@mui/material/LinearProgress';
import * as XLSX from "xlsx";
import ReactDatatableForm from "../pages/workinghours";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import "./reactDatatable.css";
import CircularProgress from '@mui/material/CircularProgress';
import './reactDatatable.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.todo);
    const [editingUser, setEditingUser] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
            dispatch(fetchTodos());
            setLoading(false);
        }, 1000);
    }, [dispatch]);

    const { error, data } = state;

    // console.log("State", state);

    const handleOpen = (row) => {
        console.log(row, "selected rows");
        setEditingUser(row);
        setOpen(true);
        setFormValues(row);
    };


    const handleEdit = (formData) => {
        Swal.fire({
            title: 'Confirm Edit',
            text: 'Are you sure you want to edit this item?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!',
            cancelButtonText: 'No, cancel!',
            width: '300px',
            // height: '100px',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            reverseButtons: true,
            focusConfirm: false,
            position: 'top',
            customClass: {
                container: 'custom-swal-container',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(updateItem({ itemId: editingUser.id, formData }))
                    .then(() => {

                        Swal.fire({
                            title: 'Updated!',
                            text: 'Your item has been updated.',
                            icon: 'success',
                            width: '300px',
                            // height: '100px',
                            position: 'top',
                            customClass: {
                                container: 'custom-swal-container',
                            },
                        });


                        handleClose();


                        dispatch(fetchTodos());
                    })
                    .catch((error) => {
                        console.error("Error updating item:", error);
                        toast.error("Error updating item. Please try again later.");
                    });
            }
        });
    };





    const handleClose = () => setOpen(false);

    const columns = [

        {
            name: "Working Type",
            selector: (row) => row.workingType,
            sortable: true,
            cell: (row) => {
                let color = "#000";
                switch (row.workingType) {
                    case "SS":
                        color = "#ff0000";
                        break;
                    case "SA":
                        color = "#00ff00";
                        break;
                    case "AA":
                        color = "#0000ff";
                        break;
                    case "AS":
                        color = "#ff00ff";
                        break;
                    default:
                        break;
                }
                return <div style={{ color }}>{row.workingType}</div>;
            },
        },
        {
            name: "Module Name",
            selector: (row) => <div title={row.moduleName.substring(0, 10)}>{row.moduleName}</div>,
            sortable: true,
        },
        {
            name: "Department Name",
            selector: (row) => <div title={row.departmentName.substring(0, 25)}>{row.departmentName}</div>,
            sortable: true,
        },
        {
            name: "Holiday",
            selector: (row) => row.holiday,
            sortable: true,
            cell: (row) => {
                let symbol = "";
                let color = "#000";
                switch (row.holiday) {
                    case "yes":
                        symbol = "✓";
                        color = "#00ff00";
                        break;
                    case "no":
                        symbol = "✗";
                        color = "#ff0000";
                        break;
                    default:
                        break;
                }
                return <div style={{ color }}>{symbol}</div>;
            },
        },
        {
            name: "From Day",
            selector: (row) => row.fromDay,
            sortable: true,
        },
        {
            name: "To Day",
            selector: (row) => row.toDay,
            sortable: true,
        },
        {
            name: "From Time",
            selector: (row) => row.fromTime,
            sortable: true,
        },
        {
            name: "To Time",
            selector: (row) => row.toTime,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <span style={{ cursor: "pointer", marginRight: 10 }} onClick={() => handleOpen(row)}>
                        <EditIcon

                            style={{ color: "blue", fontSize: 18 }}
                        />
                    </span>
                    <span style={{ cursor: "pointer" }} onClick={() => handleDelete(row.id)}>
                        <DeleteIcon style={{ color: "rgb(139,0,0)", fontSize: 18 }} />
                    </span>
                </div>
            ),
            button: true,
            ignoreRowClick: true,
        },

    ];


    const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "	#D3D3D3",
            },
        },
        pagination: {
            style: {
                fontWeight: "bold",
                position: "sticky",

            },
        },
    };
    const [filterText, setFilterText] = useState("");
    const [open, setOpen] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null); const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredItems =
        data && Array.isArray(data)
            ? data.filter((item) => {
                const searchText = filterText.toLowerCase();
                const rowValues = Object.values(item).join(" ").toLowerCase();
                return rowValues.includes(searchText);
            })
            : [];

    const handleExcelDownload = () => {

        const ws = XLSX.utils.json_to_sheet(filteredItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "user data.xlsx");
    };

    const updateTableData = () => {
        dispatch(fetchTodos());
    };



    const handleDelete = (itemId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            width: '350px',
            height: '280px',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await dispatch(deleteItem(itemId));
                    Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success',


                    );
                    dispatch(fetchTodos());
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'Failed to delete the item.',
                        'error'
                    );
                }
            }
        });
    };





    return (
        <div>
            <ToastContainer />
            {/* {loading && <CircularProgress />} */}
            {error && <div>Error: {error}</div>}
            <div>
                <Grid container>
                    {/* <SideBar /> */}
                    <Grid
                        item
                        sx={12}
                        xs={12}
                        lg={12}
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <Paper elevation={8} style={{ padding: "10px" }}>

                            <Box display="flex" alignItems="center" justifyContent="start" marginBottom="10px">
                                <Button
                                    onClick={() => handleOpen()}
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    sx={{ marginRight: 5 }}
                                    startIcon={<AddIcon />}
                                    style={{ backgroundColor: "#D3D3D3", color: 'black' }}
                                >
                                    ADD
                                </Button>
                                <TextField
                                    id="standard-basic"
                                    label="Search"
                                    variant="standard"
                                    size="small"
                                    onChange={handleFilterChange}
                                    style={{ width: "140px", marginRight: "auto" }}
                                    InputProps={{
                                        startAdornment: <SearchIcon position="start" />,
                                    }}
                                />
                                <span style={{ cursor: "pointer" }} onClick={handleExcelDownload}>
                                    <Button variant="contained" size="small" style={{ backgroundColor: "#D3D3D3", color: 'black' }}>
                                        <DownloadIcon />
                                    </Button>
                                </span>
                            </Box>
                            <div style={{ overflowX: "auto" }}>
                                <DataTable
                                    columns={columns}
                                    data={filteredItems || []}
                                    defaultSortField="moduleName"
                                    sortIcon={<SortIcon />}
                                    dense
                                    customStyles={customStyles}
                                    pagination
                                    paginationPerPage={10}
                                    paginationRowsPerPageOptions={[10, 20, 50]}
                                    highlightOnHover
                                    striped
                                    fixedHeader
                                    progressPending={loading}
                                    progressComponent={<CircularProgress color="secondary" />}
                                />
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}

                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            maxWidth: "80%",
                            maxHeight: '100vh',
                            overflowY: 'auto',
                            bgcolor: "background.paper",
                            p: 2,
                        }}
                    >
                        <ReactDatatableForm
                            handleClose={() => setOpen(false)}
                            updateTableData={updateTableData}
                            editingUser={editingUser}
                            handleEdit={handleEdit}
                            formData={formValues}
                            setFormValues={setFormValues}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default UserForm;
