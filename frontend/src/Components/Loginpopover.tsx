import React, { useState } from 'react';
import { Popover, TextField, Button, Link } from '@mui/material';
import '../styles/authentication/login/local.css'

import CreateAccountPopover from '../Components/CreateAccountPopover';

interface LoginPopoverProps {
    anchorEl: HTMLElement | null;
    openLogin: boolean;
    handleCloseLogin: () => void;
}

const LoginPopover: React.FC<LoginPopoverProps> = ({ anchorEl, openLogin, handleCloseLogin }) => {
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
                <div className="popover-form-container login-container" style={{ padding: '20px', maxWidth: '300px' }}>
                    <TextField
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                    />
                    <Button onClick={handleCloseLogin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                        Log In
                    </Button>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <Link href="#" onClick={(e) => { e.preventDefault(); handleOpenCreateAccount(); }}>
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
