import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { Booking } from '../../models';

interface ApproveReservationModalProps {
    open: boolean;
    data?: Booking | null;
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

const ApproveReservationModal: React.FC<ApproveReservationModalProps> = ({
    open,
    onClose,
    data,
    onConfirm,
}) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [shouldShow, setShouldShow] = useState(true);

    // Check localStorage to determine if the modal should show
    useEffect(() => {
        setDontShowAgain(false);
        const shouldShowModal =
            localStorage.getItem('dontShowModal') !== 'true';
        setShouldShow(shouldShowModal);
    }, [onClose, localStorage]);

    // Handle "Don't Show Again" checkbox toggle
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = event.target.checked;
        setDontShowAgain(isChecked);
        if (isChecked) {
            localStorage.setItem('dontShowModal', 'true');
        } else {
            localStorage.setItem('dontShowModal', 'false');
        }
    };

    return (
        <Modal open={open && shouldShow} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Approve "{data?.title}" reservation?
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dontShowAgain}
                            onChange={handleCheckboxChange}
                            color="primary"
                        />
                    }
                    label="Don't show this again"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                        },
                    }}
                />
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

export default ApproveReservationModal;
