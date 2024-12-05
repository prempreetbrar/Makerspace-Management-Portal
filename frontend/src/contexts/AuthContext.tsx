import React, { ReactNode } from 'react';
import axios from '../axios'; // the
import Axios from 'axios'; // the module
export enum UserRoles {
    ADMIN = 'admin',
    BASIC = 'basic',
    PREMIUM = 'premium',
}

// just copied the columns word for word from the backend
export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    confirmPassword?: string;
    userRole?: UserRoles;
    // additional properties just cause there was miscommunication between the FE and BE
    [key: string]: unknown;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

enum AuthActionsTypes {
    LOGIN,
    LOGOUT,
}

interface AuthAction {
    type: AuthActionsTypes;
    payload: User | null;
}

export interface AuthContext {
    user: User | null | undefined;
    isLoading: boolean;
    login: (email: string, password: string) => AuthFunctionStatus;
    signup: (userData: User) => AuthFunctionStatus;
    logout: () => void;
    refetch: () => AuthFunctionStatus;
}

export const AuthContext = React.createContext<AuthContext | null>(null);
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionsTypes.LOGIN:
            return { user: action.payload, isLoading: false };
        case AuthActionsTypes.LOGOUT:
            return { user: null, isLoading: false };
        default:
            return state;
    }
};

type AuthFunctionStatus = Promise<{
    isSuccess: boolean;
    message: string | null;
}>;

/*
  We "provide" the children with authentication context.
*/
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = React.useReducer(authReducer, {
        // to begin with, the user is not logged in; we have no user.
        user: null,
        isLoading: true,
    });

    /*
      If the user is visiting the frontend for the first time, it's possible they're still
      logged in from some previous visit. So if they are, make sure we're not prompting them to login again.
    */
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
            dispatch({ type: AuthActionsTypes.LOGIN, payload: user });
        } else {
            dispatch({ type: AuthActionsTypes.LOGOUT, payload: null });
        }
    }, []);

    const login = async (
        email: string,
        password: string
    ): AuthFunctionStatus => {
        try {
            const response = await axios.post('/users/login', {
                email,
                password,
            });
            const user = response.data?.user;

            // these two lines aren't redundant. localStorage remembers the user for future visits to the website.
            // dispatch ensures the user is available for the entire application.
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: AuthActionsTypes.LOGIN, payload: user });

            return { isSuccess: true, message: 'success' };
        } catch (error: unknown) {
            if (Axios.isAxiosError(error)) {
                console.error(
                    'Login failed:',
                    error.response?.data || error.message
                );

                return {
                    isSuccess: false,
                    message: error.response?.data.message,
                };
            }
        }

        return {
            isSuccess: false,
            message: 'Something went wrong. Please try again later.',
        };
    };

    const signup = async (userData: User): AuthFunctionStatus => {
        try {
            const response = await axios.post('/users/signup', userData);
            const user = response.data?.user;
            
            // these two lines aren't redundant. localStorage remembers the user for future visits to the website.
            // dispatch ensures the user is available for the entire application.
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: AuthActionsTypes.LOGIN, payload: user });

            return { isSuccess: true, message: 'success' };
        } catch (error: unknown) {
            if (Axios.isAxiosError(error)) {
                console.error(
                    'Signup failed:',
                    error.response?.data || error.message
                );

                return {
                    isSuccess: false,
                    message: error.response?.data.message,
                };
            }
        }

        return {
            isSuccess: false,
            message: 'Something went wrong. Please try again later.',
        };
    };

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: AuthActionsTypes.LOGOUT, payload: null });
    };

    // this function is used when a major change happens to the user (such as becoming premium), and we need their updated
    // info on the frontend.
    const refetch = async (): AuthFunctionStatus => {
        try {
            const response = await axios.get('/users/profile');
            const user = response.data?.user;

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: AuthActionsTypes.LOGIN, payload: user });
                return {
                    isSuccess: true,
                    message: 'User refetched successfully.',
                };
            }

            return { isSuccess: false, message: 'User not found.' };
        } catch (error: unknown) {
            if (Axios.isAxiosError(error)) {
                console.error(
                    'Failed to refetch user:',
                    error.response?.data || error.message
                );
                return {
                    isSuccess: false,
                    message:
                        error.response?.data?.message ||
                        'Failed to refetch user.',
                };
            }
        }
        return {
            isSuccess: false,
            message: 'Something went wrong. Please try again later.',
        };
    };

    return (
        <AuthContext.Provider
            value={{ ...state, login, signup, logout, refetch }}
        >
            {children}
        </AuthContext.Provider>
    );
};
