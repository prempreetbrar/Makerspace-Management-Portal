import React, { useState } from 'react';
import { Snackbar, useMediaQuery } from '@mui/material';
import theme from '../../theme.ts';

const useSnackbar = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const showSnackbar = (text: string) => {
        setMessage(text);
        setOpen(true);
    };

    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const SnackbarComponent = () => (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message={message}
            sx={{
                '& .MuiSnackbarContent-root': {
                    backgroundColor: isMobile
                        ? theme.palette.primary.main
                        : '#121212',
                    color: 'white',
                    borderRadius: 3,
                    padding: '8px 16px',
                },
            }}
        />
    );

    return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;
