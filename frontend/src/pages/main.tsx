import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Landing.tsx';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import Requests from './Requests.tsx';
import ReserveEquipment from './ReserveEquipment.tsx';
import Profile from './Profile.tsx';
import '../styles/index.css';
import { UserProvider } from '../hooks/UserProvider.tsx';
import { AuthProvider } from '../contexts/AuthContext.tsx';
import { EquipmentContext, EquipmentDataProvider } from '../contexts/EquipmentContext.tsx';
import ProtectedRoute from '../Components/ProtectedRoute.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'signup',
        element: (
            <Signup
                onClose={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        ),
    },
    {
        path: 'requests',
        element: (
          <ProtectedRoute>
              <Requests />
          </ProtectedRoute>
      ),
    },
    {
        path: 'reserve',
        element: (
          <ProtectedRoute>
              <EquipmentDataProvider>
                  <ReserveEquipment />
              </EquipmentDataProvider>
          </ProtectedRoute>
      ),
    },
    {
        path: 'profile',
        element: (
          <ProtectedRoute>
              <Profile />
          </ProtectedRoute>
      ),
    },
    {
        path: 'home',
        element: <Landing />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <AuthProvider>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </AuthProvider>
    </React.StrictMode>
);
