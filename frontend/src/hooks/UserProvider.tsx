import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { UserRoles } from '../contexts/AuthContext'

type TestUser = 
{
    email: string,
    firstName: string,
    lastName: string,
    userRole: UserRoles,
}

const adminUser = {
    email: 'real_email3@email.com',
    firstName: 'Austin',
    lastName: 'Matthews',
    userRole: UserRoles.ADMIN
}

const premiumUser = {
    email: 'real_email1@email.com',
    firstName: 'Connor',
    lastName: 'McDavid',
    userRole: UserRoles.PREMIUM
}

const basicUser = {
    email: 'real_email2@email.com',
    firstName: 'Sidney',
    lastName: 'Crosby',
    userRole: UserRoles.BASIC
}
// Predefined user objects
const users = [basicUser, premiumUser, adminUser];
export interface UserContext
{
    index: number,
    user: TestUser,
    setUser: () => void
}
// Create a User Context with default values
const UserContext = createContext<UserContext>({
    index: 0,
    user: basicUser, // Default to the first user
    setUser: () => { }, // Placeholder function
});

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [user, setCurrentUser] = useState(users[0]);
    const setUser = () => {
        setCurrentUserIndex((currentUserIndex + 1) % users.length);
        setCurrentUser(users[currentUserIndex]);
        console.log(currentUserIndex);
    };
    return (
        <UserContext.Provider value={{ user: user, index: currentUserIndex, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
