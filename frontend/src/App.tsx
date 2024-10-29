import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import { UUID } from 'crypto';

// Define the structure of backend data
type User = {
  email: string;
  firstName: string;
  lastName: string;
  userRole: string;
  password: string;
};

type Issue = {
  id: UUID;
  equipmentName: string;
  description: Text;
  dateSubmitted: Date;
  issueStatus: Boolean;
};

type Equipment = {
  id: UUID;
  name: string;
  description: string;
  icon: {
    type: string;
    data: number[];
  };
  equipmentStatus: string;
  isBookable: boolean;
  isPremium: boolean;
};

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  // Effect hook for fetching data from the backend
  const fetchAPI = async () => {
    try {
      const [usersResponse, issuesResponse, equipmentResponse] = await Promise.all([
        axios.get("http://localhost:8080/users"),
        axios.get("http://localhost:8080/issues"),
        axios.get("http://localhost:8080/equipment")
      ]);

      setUsers(usersResponse.data);
      setIssues(issuesResponse.data);
      setEquipment(equipmentResponse.data);
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
                <p>Equipment Name: {issue.equipmentName}</p>
                <p>Description: {issue.description.wholeText}</p>
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
                <p>Name: {equip.name}</p>
                <p>Description: {equip.description}</p>
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
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

