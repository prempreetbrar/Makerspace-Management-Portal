import React, { useState, useContext } from 'react';
import { Popover, TextField, Button, Link, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/authentication/login/local.css';

import CreateAccountPopover from './CreateAccountPopover.tsx';
import { AuthContext } from '../contexts/AuthContext';
import { ErrorWithStatusCode } from '../axios.ts';
import { useNavigate } from 'react-router-dom';

interface LoginPopoverProps {
    anchorEl: HTMLElement | null;
    openLogin: boolean;
    handleCloseLogin: () => void;
}

const LoginPopover: React.FC<LoginPopoverProps> = ({
    anchorEl,
    openLogin,
    handleCloseLogin,
}) => {
    const { login } = useContext(AuthContext)!;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [openCreateAccount, setOpenCreateAccount] = useState(false);
    const navigate = useNavigate();

    const handleOpenCreateAccount = () => {
        setOpenCreateAccount(true);
    };

    const handleCloseCreateAccount = () => {
        setOpenCreateAccount(false);
    };

    const handleOpenLogin = () => {
        setOpenCreateAccount(false);
    };

    const handleLogin = async () => {
        try {
            const { isSuccess, message } = await login(email, password);
            if (isSuccess) {
                handleCloseLogin();
                navigate('/reserve');
            } else {
                setError(message);
            }
        } catch (err: unknown) {
            if (err instanceof ErrorWithStatusCode) {
                setError(err.message);
            }
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#65558F',
            },
            secondary: {
                main: '#ECE6F0',
            },
            text: {
                primary: '#000000',
                secondary: '#5F5F5F',
            },
            background: {
                default: '#FFFFFF',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });
    return (
        <>
          <ThemeProvider theme={theme}>
            <Popover
                open={openLogin}
                anchorEl={anchorEl}
                onClose={handleCloseLogin}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box
                    className="popover-form-container login-container"
                    sx={{ padding: '20px', maxWidth: '300px' }}
                >
                    {error && (
                        <p style={{ color: 'red', marginBottom: '1rem' }}>
                            {error}
                        </p>
                    )}
                    <TextField
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Log In
                    </Button>
                    <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
                        <Link
                        
                            component="button"
                            variant="body2"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOpenCreateAccount();
                            }}
                            sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
                        >
                            Create Account
                        </Link>
                    </Box>
                </Box>
            </Popover>
            </ThemeProvider>

            <CreateAccountPopover
                anchorEl={anchorEl}
                openCreateAccount={openCreateAccount}
                handleCloseCreateAccount={handleCloseCreateAccount}
                handleOpenLogin={handleOpenLogin}
            />
        </>
    );
};

export default LoginPopover;
