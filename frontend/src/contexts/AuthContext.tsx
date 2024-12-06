import React, { ReactNode, useReducer, useContext, useEffect } from 'react';
import axios from '../axios'; // Custom axios instance
import Axios from 'axios'; // Axios library

export enum UserRoles {
    ADMIN = 'admin',
    BASIC = 'basic',
    PREMIUM = 'premium',
}

// User interface matching backend schema
export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    confirmPassword?: string;
    userRole?: UserRoles;
    [key: string]: unknown; // Additional dynamic properties
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

enum AuthActionTypes {
    LOGIN,
    LOGOUT,
}

interface AuthAction {
    type: AuthActionTypes;
    payload: User | null;
}

export type AuthFunctionStatus = Promise<{
    isSuccess: boolean;
    message: string | null;
}>;

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => AuthFunctionStatus;
    signup: (userData: User) => AuthFunctionStatus;
    logout: () => void;
    refetch: () => AuthFunctionStatus;
}

// Create a strongly typed context
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return { user: action.payload, isLoading: false };
        case AuthActionTypes.LOGOUT:
            return { user: null, isLoading: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoading: true,
    });

    // Check for existing user on initial load
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
            dispatch({ type: AuthActionTypes.LOGIN, payload: user });
        } else {
            dispatch({ type: AuthActionTypes.LOGOUT, payload: null });
        }
    }, []);

    const login = async (
        email: string,
        password: string
    ): AuthFunctionStatus => {
        try {
            const response = await axios.post('/users/login', { email, password });
            const user = response.data?.user;

            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: AuthActionTypes.LOGIN, payload: user });

            return { isSuccess: true, message: 'Login successful' };
        } catch (error: unknown) {
            if (Axios.isAxiosError(error)) {
                console.error('Login failed:', error.response?.data || error.message);
                return { isSuccess: false, message: error.response?.data.message };
            }
            return { isSuccess: false, message: 'An unexpected error occurred' };
        }
    };

    const signup = async (userData: User): AuthFunctionStatus => {
        try {
            const response = await axios.post('/users/signup', userData);
            const user = response.data?.user;

            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: AuthActionTypes.LOGIN, payload: user });

            return { isSuccess: true, message: 'Signup successful' };
        } catch (error: unknown) {
            if (Axios.isAxiosError(error)) {
                console.error('Signup failed:', error.response?.data || error.message);
                return { isSuccess: false, message: error.response?.data.message };
            }
            return { isSuccess: false, message: 'An unexpected error occurred' };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: AuthActionTypes.LOGOUT, payload: null });
    };

    const refetch = async (): AuthFunctionStatus => {
        try {
            const response = await axios.get('/users/profile');
            const user = response.data?.user;

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: AuthActionTypes.LOGIN, payload: user });
                return { isSuccess: true, message: 'User refetched successfully' };
            }

            return { isSuccess: false, message: 'User not found' };
        } catch (error: unknown) {
            if (Axios.isAxiosError(error)) {
                console.error('Refetch failed:', error.response?.data || error.message);
                return { isSuccess: false, message: error.response?.data.message };
            }
            return { isSuccess: false, message: 'An unexpected error occurred' };
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, signup, logout, refetch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for accessing the context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

