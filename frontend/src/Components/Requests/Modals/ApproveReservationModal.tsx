import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Booking } from '../../../models';
import theme from '../../../theme';

interface ApproveReservationModalProps {
    open: boolean;
    data?: Booking | null;
    onClose: () => void;
    onConfirm: () => void;
    storageKey: string;
}

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    width: 500,
    [theme.breakpoints.down('md')]: {
        width: 300,
        padding: '24px',
        textAlign: 'center',
        top: '40%',
    },
};

const titleStyle = {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '2px',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
    },
};

const descriptionStyle = {
    fontSize: '14px',
    color: '#757575',
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: {
        fontSize: '12px',
    },
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
};

const buttonStyles = {
    close: {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ddd',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: 2,
        padding: '8px 16px',
        width: 100,
        '&:hover': {
            backgroundColor: '#f1f1f1',
        },
    },
    continue: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: 2,
        padding: '8px 16px',
        width: 150,
        '&:hover': {
            backgroundColor: '#333',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
            marginInline: 'auto',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
            width: '90%',
            mt: 2,
        },
    },
};

const closeIconStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    [theme.breakpoints.down('md')]: {
        top: '8px',
        right: '8px',
    },
};

const ApproveReservationModal: React.FC<ApproveReservationModalProps> = ({
    open,
    onClose,
    data,
    onConfirm,
    storageKey,
}) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [shouldShow, setShouldShow] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Media query

    // Check localStorage to determine if the modal should show
    useEffect(() => {
        setDontShowAgain(false);
        const shouldShowModal = localStorage.getItem(storageKey) !== 'true';
        setShouldShow(shouldShowModal);
    }, [open]);

    // Handle "Don't Show Again" checkbox toggle
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = event.target.checked;
        setDontShowAgain(isChecked);
        if (isChecked) {
            localStorage.setItem(storageKey, 'true');
        } else {
            localStorage.setItem(storageKey, 'false');
        }
    };

    return (
        <Modal open={open && shouldShow} onClose={onClose}>
            <Box sx={style}>
                {isMobile && (
                    <IconButton sx={closeIconStyle} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
                <Typography variant="h6" sx={titleStyle}>
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
                    label="Don't show again"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            color: '#757575',
                            fontSize: '14px',
                        },
                    }}
                />
                <Box sx={buttonContainerStyle}>
                    {!isMobile && (
                        <Button sx={buttonStyles.close} onClick={onClose}>
                            Close
                        </Button>
                    )}
                    <Button sx={buttonStyles.continue} onClick={onConfirm}>
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ApproveReservationModal;
