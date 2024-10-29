import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

// Define the structure of backend data
type User = {
  email: string;
  firstName: string;
  lastName: string;
  userRole: string;
  password: string;
};

type Issue = {
  id: number;
  equipmentName: string;
  description: Text;
  dateSubmitted: Date;
  issueStatus: Boolean;
};

type Equipment = {
  id: number;
  name: string;
  description: Text;
  icon: {
    type: string;
    data: number[];
  };
  equipmentStatus: string;
  isBookable: boolean;
  isPremium: boolean;
};

type Booking = {
  id: number;
  userEmail: string;
  equipmentID: number;
  bookingDateTime: Date;
  bookingDuration: number;
};

type Request = {
  id: number;
  userEmail: string;
  description: Text;
  status: string;
};

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  // Effect hook for fetching data from the backend
  const fetchAPI = async () => {
    try {
      const [usersResponse, issuesResponse, equipmentResponse, bookingsResponse, requestsResponse] = await Promise.all([
        axios.get("http://localhost:8080/users"),
        axios.get("http://localhost:8080/issues"),
        axios.get("http://localhost:8080/equipment"),
        axios.get("http://localhost:8080/bookings"),
        axios.get("http://localhost:8080/requests")
      ]);

      setUsers(usersResponse.data);
      setIssues(issuesResponse.data);
      setEquipment(equipmentResponse.data);
      setBookings(bookingsResponse.data);
      setRequests(requestsResponse.data);
    } 
    catch (error) {
      console.error("Error fetching data (frontend):", error);
    }
  };

  useEffect(() => {
    fetchAPI(); // Fetch data when the component mounts
  }, []);

  // Helper function to convert icon data to base64
  const arrayBufferToBase64 = (buffer: number[]) => {
    const binary = String.fromCharCode(...buffer);
    return window.btoa(binary);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.tsx</code> and save to test HMR</p>

        {/* Display users */}
        <div>
          <h2>Users List</h2>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index}>
                <p>Email: {user.email}</p>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>User Role: {user.userRole}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>

        {/* Display issues */}
        <div>
          <h2>Issues List</h2>
          {issues.length > 0 ? (
            issues.map((issue, index) => (
              <div key={index}>
                <p>ID: {issue.id}</p>
                <p>Equipment Name: {issue.equipmentName}</p>
                <p>Description: {String(issue.description)}</p>
                <p>Date Submitted: {new Date(issue.dateSubmitted).toLocaleString()}</p>
                <p>Status: {issue.issueStatus ? "Resolved" : "Pending"}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No issues found.</p>
          )}
        </div>

        {/* Display equipment */}
        <div>
          <h2>Equipment List</h2>
          {equipment.length > 0 ? (
            equipment.map((equip, index) => (
              <div key={index}>
                <p>ID: {equip.id}</p>
                <p>Name: {equip.name}</p>
                <p>Description: {String(equip.description)}</p>
                <p>Icon: </p>
                {equip.icon && equip.icon.data && (
                  <img
                    src={`data:image/png;base64,${arrayBufferToBase64(equip.icon.data)}`}
                    alt={`${equip.name} icon`}
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
                <p>Status: {equip.equipmentStatus}</p>
                <p>Bookable: {equip.isBookable ? "Yes" : "No"}</p>
                <p>Premium: {equip.isPremium ? "Yes" : "No"}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No equipment found.</p>
          )}
        </div>

        {/* Display bookings */}
        <div>
          <h2>Bookings List</h2>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index}>
                <p>Booking ID: {booking.id}</p>
                <p>User Email: {booking.userEmail}</p>
                <p>Equipment ID: {booking.equipmentID}</p>
                <p>Booking Date Time: {new Date(booking.bookingDateTime).toLocaleString()}</p>
                <p>Booking Duration: {booking.bookingDuration} hours</p>
                <br />
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>

        {/* Display requests */}
        <div>
          <h2>Requests List</h2>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <div key={index}>
                <p>ID: {request.id}</p>
                <p>User Email: {request.userEmail}</p>
                <p>Description: {String(request.description)}</p>
                <p>Status: {request.status}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
