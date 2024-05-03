import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const DraggableDialog = ({ open, handleClose, userDetails }) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            {/* <div style={{ marginTop: "2px", marginBottom: "-30px" }}> */}
            <IconButton edge="end" onClick={handleClose} aria-label="close" style={{ position: 'absolute', top: "-5px", right: '10px', marginTop: "2px", marginBottom: "-30px" }}>
                <CloseIcon />
            </IconButton>
            <DialogTitle style={{ cursor: 'move', textAlign: 'center', height: "20px", }} id="draggable-dialog-title" display="flex" justifyContent="center" alignItems="center">
                USER DETAILS
            </DialogTitle>
            {/* </div> */}

            <DialogContent  >
                <DialogContentText  >
                    <table style={{ fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', width: '100%', marginTop: "20px" }}>
                        <thead  >
                            <tr style={{ backgroundColor: "rgb(41,128,185)" }}>
                                <th style={{ border: '1px solid black', textAlign: 'center', padding: "2px", color: "white", fontSize: "15px" }}> Name</th>
                                <th style={{ border: '1px solid black', textAlign: 'center', padding: "2px", color: "white", fontSize: "15px" }}> Email</th>
                                <th style={{ border: '1px solid black', textAlign: 'center', padding: "2px", color: "white", fontSize: "15px" }}>Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td style={{ border: '1px solid  ', color: "black", textAlign: 'center', padding: "2px", fontSize: "15px" }}>{userDetails ? userDetails.fullName : ''}</td>
                                <td style={{ border: '1px solid  ', color: "black", textAlign: 'center', padding: "2px", fontSize: "15px" }}>{userDetails ? userDetails.email : ''}</td>
                                <td style={{ border: '1px solid  ', color: "black", textAlign: 'center', padding: "2px", fontSize: "15px" }}>{userDetails ? userDetails.mobileNumber : ''}</td>
                            </tr>
                            {/* <tr>
                                <td style={{ border: '1px solid  ', color: "black", textAlign: 'center', padding: "2px" }}>{userDetails ? userDetails.fullName : ''}</td>
                                <td style={{ border: '1px solid  ', color: "black", textAlign: 'center', padding: "2px" }}>{userDetails ? userDetails.email : ''}</td>
                                <td style={{ border: '1px solid  ', color: "black", textAlign: 'center', padding: "2px" }}>{userDetails ? userDetails.mobileNumber : ''}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ marginTop: "-10px" }}>
                <Button onClick={handleClose} variant="contained" size="small" style={{ color: "white " }}>
                    Close
                </Button>
                {/* <Button onClick={handleClose}>Subscribe</Button> */}
            </DialogActions>
        </Dialog>
    );
}

export default DraggableDialog;
