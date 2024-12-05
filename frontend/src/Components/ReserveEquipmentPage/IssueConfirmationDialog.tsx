import React from 'react';
import { Dialog, DialogActions, DialogContent,Box, DialogTitle, Button, Typography } from '@mui/material';

interface IssueConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
}

const IssueConfirmationDialog: React.FC<IssueConfirmationDialogProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
       
            <DialogContent>
                <Typography variant="body1">
                    Your Equipment Issue Has Been Reported.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Box sx={{paddingRight: '10px',paddingBottom: '10px'}}>
                <Button sx={{
                                backgroundColor: 'black',
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                                marginLeft: '15px',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                                fontWeight: 'bold',
                            }} onClick={onClose} color="primary" autoFocus>
                    Close
                </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default IssueConfirmationDialog;
