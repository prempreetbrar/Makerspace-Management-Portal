import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import { UUID } from 'crypto';

// Define the structure of a User
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

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  // Effect hook for fetching data from the backend
  const fetchAPI = async () => {
    try {
      const [usersResponse, issuesResponse] = await Promise.all([
        axios.get("http://localhost:8080/users"),  // Change port to 5001 to run on docker
        axios.get("http://localhost:8080/issues")
      ]);

      setUsers(usersResponse.data);
      setIssues(issuesResponse.data);
    } 
    catch (error) {
      console.error("Error fetching data (frontend):", error);
    }
  };

  useEffect(() => {
    fetchAPI(); // Fetch data when the component mounts
  }, []);

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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {/* Display users */}
        <div>
          <h2>Users List</h2>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index}>
                <p>email: {user.email}</p>
                <p>firstName: {user.firstName}</p>
                <p>lastName: {user.lastName}</p>
                <p>userRole: {user.userRole}</p>
                <p>password: {user.password}</p>
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
                <p>id: {issue.id}</p>
                <p>equipmentName: {issue.equipmentName}</p>
                <p>description: {issue.description}</p>
                <p>dateSubmitted: {issue.dateSubmitted.toString()}</p>
                <p>issueStatus: {issue.issueStatus ? "Resolved" : "Unresolved"}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No issues found.</p>
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

