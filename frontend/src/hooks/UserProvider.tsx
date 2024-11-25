import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
const adminUser = {
    email: 'real_email3@email.com',
    firstName: 'Austin',
    lastName: 'Matthews',
    userRole: 'Admin',
}

const premiumUser = {
    email: 'real_email1@email.com',
    firstName: 'Connor',
    lastName: 'McDavid',
    userRole: 'Premium',
}

const basicUser = {
    email: 'real_email2@email.com',
    firstName: 'Sidney',
    lastName: 'Crosby',
    userRole: 'Basic',
}
// Predefined user objects
const users = [basicUser, premiumUser, adminUser];

// Create a User Context with default values
const UserContext = createContext({
    user: users[0], // Default to the first user
    setUserByIndex: (_index: number) => { }, // Placeholder function
});

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [user, setCurrentUser] = useState(users[currentUserIndex]);
    const setUserByIndex = (index: number) => {
        setCurrentUserIndex(index % users.length);
        setCurrentUser(users[currentUserIndex]);
        console.log(currentUserIndex);
    };
    return (
        <UserContext.Provider value={{ user: user, setUserByIndex }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
