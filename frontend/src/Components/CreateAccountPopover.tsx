import React, { useState, useContext } from 'react';
import { Popover, TextField, Button, Link, Box } from '@mui/material';
import '../styles/authentication/login/local.css';
import { AuthContext } from '../contexts/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorWithStatusCode } from '../axios';

interface CreateAccountPopoverProps {
    anchorEl: HTMLElement | null;
    openCreateAccount: boolean;
    handleCloseCreateAccount: () => void;
    handleOpenLogin: () => void;
}

const CreateAccountPopover: React.FC<CreateAccountPopoverProps> = ({
    anchorEl,
    openCreateAccount,
    handleCloseCreateAccount,
    handleOpenLogin,
}) => {
    const { signup } = useContext(AuthContext)!;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const { isSuccess, message } = await signup({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });

            if (isSuccess) {
                handleCloseCreateAccount();
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
            open={openCreateAccount}
            anchorEl={anchorEl}
            onClose={handleCloseCreateAccount}
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
                className="popover-form-container create-account-container"
                sx={{ padding: '20px', maxWidth: '300px' }}
            >
                {error && (
                    <p style={{ color: 'red', marginBottom: '1rem' }}>
                        {error}
                    </p>
                )}
                <TextField
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <TextField
                    margin="dense"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Create Account
                </Button>
                <Box sx={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Roboto, sans-serif', fontSize:'15px' }}>
                    Already have an account?{' '}
                    <Link
                       
                        component="button"
                        variant="body2"
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpenLogin();
                        }}
                        sx={{  color: theme.palette.primary.main }}
                    >
                        Log In
                    </Link>
                </Box>
            </Box>
        </Popover>
        </ThemeProvider>
        </>
    );
};

export default CreateAccountPopover;
