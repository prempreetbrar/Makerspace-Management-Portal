import React, { useState, useContext } from 'react';
import { Popover, TextField, Button, Link } from '@mui/material';
import '../styles/authentication/login/local.css';

import CreateAccountPopover from './CreateAccountPopover.tsx';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

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
    const { login } = useContext(AuthContext)!; // Access login from AuthContext

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [openCreateAccount, setOpenCreateAccount] = useState(false);

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
            await login(email, password);
            handleCloseLogin();
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
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
                <div
                    className="popover-form-container login-container"
                    style={{ padding: '20px', maxWidth: '300px' }}
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
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleOpenCreateAccount();
                            }}
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </Popover>

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
