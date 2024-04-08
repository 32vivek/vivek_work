import React, { useEffect, useState } from "react";
import { ToastContainer, toast, setToastProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, setToastProps } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteItem, updateItem } from "../React-Redux/slice/data";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import SideBar from "./sidebar/sidebar";
import Grid from "@mui/material/Grid";
import { Paper, Button, Typography } from "@mui/material";
import { Box, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import * as XLSX from "xlsx";
import ReactDatatableForm from "../pages/reactDatatableForm";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
// import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const UserForm = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.todo);
    const [editingUser, setEditingUser] = useState(null);
    const [formValues, setFormValues] = useState(null);
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const { loading, error, data } = state;

    // console.log("State", state);

    const handleOpen = (row) => {
        console.log(row, "selected rows");
        setEditingUser(row);
        setOpen(true);
        setFormValues(row);
    };


    const handleEdit = (formData) => {
        console.log(formData, "daa");
        dispatch(updateItem({ itemId: editingUser.id, formData }))
            .then(() => {
                setOpen(false);
                toast.success('Item updated successfully!');
                dispatch(fetchTodos());
            })
            .catch((error) => {
                console.error("Error updating item:", error);
                toast.error("Error updating item. Please try again later.");
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
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            width: '400px',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await dispatch(deleteItem(itemId));

                    toast.success('Item deleted successfully!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    dispatch(fetchTodos());
                } catch (error) {
                    toast.success('Item deleted successfully!', {
                        // position: toast.POSITION.TOP_CENTER
                    });
                }
            }
        });
    };




    return (
        <div>
            <ToastContainer />
            {loading && <CircularProgress />}
            {error && <div>Error: {error}</div>}
            <div>
                <Grid container>
                    <SideBar />
                    <Grid
                        item
                        xs={12}
                        md={9}
                        lg={10}
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "100px",
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
                            <div style={{ height: "400px", overflowY: "auto" }}>
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
                            top: "48%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            maxWidth: 800,
                            bgcolor: "background.paper",
                            p: 3,
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
