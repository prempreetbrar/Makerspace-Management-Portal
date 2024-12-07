import React, { useState, createContext, useContext, useMemo } from 'react';
import { Snackbar, useMediaQuery, SnackbarContent } from '@mui/material';
import theme from '../theme.ts';

// Define types for the Snackbar message
type SnackbarType = 'default' | 'success' | 'error';

// Define the context to provide the showSnackbar function
const SnackbarContext = createContext<{
    showSnackbar: (message: string, type?: SnackbarType) => void;
} | null>(null);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<SnackbarType>('default');

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Function to show Snackbar with a message and optional type
    const showSnackbar = (
        text: string,
        snackbarType: SnackbarType = 'default'
    ) => {
        setMessage(text);
        setType(snackbarType);
        setOpen(true);
    };

    // Handle Snackbar close event
    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Use different styles based on the Snackbar type
    const snackbarStyle = useMemo(() => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#4caf50', // Green color for success
                };
            case 'error':
                return {
                    backgroundColor: '#f44336', // Red color for error
                };
            default:
                return {
                    backgroundColor: isMobile
                        ? theme.palette.primary.main
                        : '#1D1B20', // Default color
                };
        }
    }, [type, isMobile]);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    zIndex: 10000,
                    position: 'fixed',
                }}
            >
                <SnackbarContent
                    message={message}
                    sx={{
                        ...snackbarStyle,
                        color: 'white',
                        borderRadius: 3,
                        padding: '8px 16px',
                    }}
                />
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

// Custom hook to access Snackbar context
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
