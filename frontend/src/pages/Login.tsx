import React, { useState, useContext } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import '../styles/authentication/login/Login-mobile.css';
import { AuthContext } from '../contexts/AuthContext';
import { ErrorWithStatusCode } from '../axios';

interface LoginProps {
    onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
    const { login } = useContext(AuthContext)!;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    const handleLogin = async () => {
        if (!email || !password) {
            setError('Email and Password are required.');
            return;
        }

        try {
            const { isSuccess, message } = await login(email, password);
            if (isSuccess && onClose) {
                onClose();
            } else {
                setError(message);
            }
        } catch (err: unknown) {
            if (err instanceof ErrorWithStatusCode) {
                setError(err.message);
            }
        }
    };

    return (
        <Dialog
            open={true}
            onClose={onClose}
            PaperProps={{ className: 'dialog-paper' }}
        >
            <DialogTitle className="dialog-title">Login</DialogTitle>
            <DialogContent className="dialog-content">
                {error && (
                    <p style={{ color: 'red', marginBottom: '1rem' }}>
                        {error}
                    </p>
                )}
                <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    margin="normal"
                    className="text-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    className="text-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions className="button-container">
                <Button
                    onClick={handleLogin}
                    className="loginbutton"
                    sx={{ backgroundColor: '#65558f', color: 'white' }}
                >
                    Log In
                </Button>
                <Button
                    onClick={onClose}
                    className="cancelbutton"
                    sx={{ color: '#65558f' }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
