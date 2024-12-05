import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
} from '@mui/material';

interface MaintenanceDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
}

const MaintenanceDialog: React.FC<MaintenanceDialogProps> = ({
    open,
    onClose,
    title,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '701px',
                    borderRadius: '8px',
                    padding: '20px',
                },
            }}
        >
            <DialogTitle>Maintenance Set Successfully</DialogTitle>
            <DialogContent>
                <Typography>
                    Item: <strong>{title}</strong>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: 2,
                        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.7)',
                        marginLeft: '15px',
                        paddingLeft: '50px',
                        paddingRight: '50px',
                        fontWeight: 'bold',
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MaintenanceDialog;
