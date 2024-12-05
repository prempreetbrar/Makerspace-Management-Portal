import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { Booking } from '../../models';

interface RejectReservationModal {
    open: boolean;
    data?: Booking | null;
    onClose: () => void;
    title?: string;
    description?: string;
    onReject: (textValue: string, idValue?: number) => void;
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
    width: 600,
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

const CancelReservationModal: React.FC<RejectReservationModal> = ({
    open,
    onClose,
    data,
    title = 'Reject Request?',
    description = 'This action cannot be undone.',
    onReject,
}) => {
    const [textValue, setTextValue] = useState<string>('');

    useEffect(() => {
        setTextValue('');
    }, [open]);

    const handleClickReject = () => {
        onReject(textValue, data?.id);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    {description}
                </Typography>
                <TextField
                    value={textValue}
                    size="small"
                    multiline
                    rows={4}
                    placeholder="Please leave a comment to explain rejection"
                    fullWidth
                    onChange={(e) => setTextValue(e.target.value)}
                    sx={{
                        mb: '20px',
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#E5E5EA',
                        },
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={buttonStyles.close} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        sx={buttonStyles.continue}
                        onClick={handleClickReject}
                    >
                        Reject
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CancelReservationModal;
