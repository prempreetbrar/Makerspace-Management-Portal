import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button, Box,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (confirmed: boolean) => void; }

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">Your Booking Has Been Submitted</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          Monitor the status of your request in the “View Requests Page.”
        </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Box sx={{ paddingRight: '10px',paddingBottom: '10px'
        }}>
        <Button onClick={onClose} sx={{
                                backgroundColor: 'black',
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                marginLeft: '15px',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                                fontWeight: 'bold',
                            }} autoFocus>
          Close
        </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
