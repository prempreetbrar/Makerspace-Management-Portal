import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of a request object
interface Request {
    id: number; // Replace with actual fields from your database
    userID: string;
    description: string;
    status: string;
}

// Define the shape of the context value
interface RequestsContextType {
    requests: Request[] | null;
    loading: boolean;
    error: string | null;
    setUserEmail: (userEmail: string) => void;
}

// Create the RequestsContext
export const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

// Define the props for the provider
interface RequestsProviderProps {
    children: ReactNode;
}

// Create the RequestsProvider component
export const RequestsProvider: React.FC<RequestsProviderProps> = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch requests whenever the userID changes
    useEffect(() => {
        if (!userEmail) return; // Don't fetch if userID is empty

        const fetchRequests = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`requests/${userEmail}`);
                setRequests(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [userEmail]);

    return (
        <RequestsContext.Provider value={{ requests, loading, error, setUserEmail }}>
            {children}
        </RequestsContext.Provider>
    );
};
