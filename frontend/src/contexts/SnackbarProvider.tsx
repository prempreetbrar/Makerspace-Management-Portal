import React, { useState, createContext, useContext, useMemo } from 'react';
import { Snackbar, useMediaQuery } from '@mui/material';
import theme from '../theme.ts';

const SnackbarContext = createContext<{
    showSnackbar: (message: string) => void;
} | null>(null);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
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

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
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
                    zIndex: 10000,
                    position: 'fixed',
                }}
            />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
