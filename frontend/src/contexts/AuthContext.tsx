import React, { ReactNode } from 'react';
import axios from '../axios';

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
    user: User | null | undefined;
    isLoading: boolean;
}

enum AuthActionsTypes {
    LOGIN,
    LOGOUT,
}

interface AuthAction {
    type: AuthActionsTypes;
    payload?: User;
}

export interface AuthContext {
    user: User | null | undefined;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (userData: User) => Promise<void>;
    logout: () => void;
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
            dispatch({ type: AuthActionsTypes.LOGOUT });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/users/login', {
                email,
                password,
            });
            const data = response.data;

            // these two lines aren't redundant. localStorage remembers the user for future visits to the website.
            // dispatch ensures the user is available for the entire application.
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: AuthActionsTypes.LOGIN, payload: data });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Login failed:',
                    error.response?.data || error.message
                );
                alert('Login failed. Please check your credentials.');
            }
        }
    };

    const signup = async (userData: User) => {
        try {
            const response = await axios.post('/users/signup', userData);
            const data = response.data;

            // these two lines aren't redundant. localStorage remembers the user for future visits to the website.
            // dispatch ensures the user is available for the entire application.
            //
            // there's only two states. Either the user is logged in, or the user is logged out. After a user signs up
            // for an account, we don't want them to have to log in manually, so we give them the logged in state.
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: AuthActionsTypes.LOGIN, payload: data });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Signup failed:',
                    error.response?.data || error.message
                );
                alert('Signup failed. Please try again.');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: AuthActionsTypes.LOGOUT });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
