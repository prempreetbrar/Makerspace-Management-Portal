import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Issue } from '../../../models';

interface CancelReservationProps {
    open: boolean;
    data?: Issue | null;
    onClose: () => void;
    onConfirm: () => void;
}

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    textAlign: 'left',
    width: 400,
};

const buttonStyles = {
    close: {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ddd',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        marginRight: '8px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#f1f1f1',
        },
        width: '100px',
        borderRadius: 2,
    },
    continue: {
        backgroundColor: 'black',
        color: 'white',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4)',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#333',
        },
        width: '100px',
        borderRadius: 2,
    },
};

const ResolveModal: React.FC<CancelReservationProps> = ({
    open,
    onClose,
    data,
    onConfirm,
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Resolve Issue
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Resolve the issue for {data?.equipment?.name}?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={buttonStyles.close} onClick={onClose}>
                        Close
                    </Button>
                    <Button sx={buttonStyles.continue} onClick={onConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ResolveModal;
