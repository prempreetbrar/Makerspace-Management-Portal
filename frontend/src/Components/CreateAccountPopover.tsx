import React, { useState, useContext } from 'react';
import { Popover, TextField, Button, Link } from '@mui/material';
import '../styles/authentication/login/local.css';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

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
    const { signup } = useContext(AuthContext)!; // Access signup from AuthContext

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
            await signup({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });

            handleCloseCreateAccount();
        } catch (err) {
            console.error('Signup failed:', err);
            setError('Signup failed. Please try again.');
        }
    };

    return (
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
            <div
                className="popover-form-container create-account-container"
                style={{ padding: '20px', maxWidth: '300px' }}
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
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpenLogin();
                        }}
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </Popover>
    );
};

export default CreateAccountPopover;
