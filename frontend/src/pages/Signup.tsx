import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import '../styles/authentication/login/Login-mobile.css';
import { User, AuthContext } from '../contexts/AuthContext';
import { ErrorWithStatusCode } from '../axios';

interface SignupProps {
    onClose: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose }) => {
    // context will never be null. We'll always be sure to wrap all components in an AuthContext.Provider
    const { signup } = React.useContext(AuthContext)!;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        studentNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    } as User);

    const [error, setError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        studentNumber: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(null);
        setPasswordError(null);
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({
            ...prev,
            [field]: true,
        }));
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters.');
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.studentNumber ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError('All fields are required.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        if (!validatePassword(formData.password)) {
            return;
        }
        
        try {
            const { isSuccess, message } = await signup(formData);
            if (isSuccess) {
                onClose();
            } else {
                setError(message);
            }
        } catch (err: unknown) {
            if (err instanceof ErrorWithStatusCode) {
                setError(err.message);
            }
        }

        console.log('User Data:', formData);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose} className="dialog">
            <DialogTitle className="dialog-title">Create Account</DialogTitle>
            <DialogContent className="dialog-content">
                <TextField
                    margin="normal"
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('firstName')}
                    fullWidth
                    variant="outlined"
                    className="text-field"
                    required
                    error={
                        (touched.firstName || error !== null) &&
                        !formData.firstName
                    }
                    helperText={
                        (touched.firstName || error !== null) &&
                        !formData.firstName
                            ? 'This field is required.'
                            : ''
                    }
                />
                <TextField
                    margin="normal"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('lastName')}
                    fullWidth
                    variant="outlined"
                    className="text-field"
                    required
                    error={
                        (touched.lastName || error !== null) &&
                        !formData.lastName
                    }
                    helperText={
                        (touched.lastName || error) && !formData.lastName
                            ? 'This field is required.'
                            : ''
                    }
                />

                <TextField
                    margin="normal"
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    fullWidth
                    variant="outlined"
                    className="text-field"
                    required
                    error={(touched.email || error !== null) && !formData.email}
                    helperText={
                        (touched.email || error) && !formData.email
                            ? 'This field is required.'
                            : ''
                    }
                />
                <TextField
                    margin="normal"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    fullWidth
                    variant="outlined"
                    className="text-field"
                    required
                    error={
                        (touched.password ||
                            error !== null ||
                            passwordError !== null) &&
                        !formData.password
                    }
                    helperText={
                        (touched.password || error || passwordError) &&
                        !formData.password
                            ? 'This field is required.'
                            : passwordError
                    }
                />
                <TextField
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    fullWidth
                    variant="outlined"
                    className="text-field"
                    required
                    error={touched.confirmPassword || passwordError !== null}
                    helperText={
                        passwordError ||
                        (touched.confirmPassword && !formData.confirmPassword
                            ? 'This field is required.'
                            : '')
                    }
                />
            </DialogContent>
            <DialogActions className="button-container">
                <Button
                    onClick={handleSignup}
                    className="sign-up-button"
                    sx={{ backgroundColor: '#65558f', color: 'white' }}
                >
                    Sign Up
                </Button>
                <Button
                    onClick={onClose}
                    className="cancel-button"
                    sx={{ backgroundColor: 'white', color: '#65558f' }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Signup;
