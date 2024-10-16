import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

// Define the structure of a User
type User = {
  username: string;
  birthday: string;
};

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from the backend
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users"); // Use this line to run on local machine
      // const response = await axios.get("/users"); // Use this line to run in the docker container
      setUsers(response.data);
    } 
    catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAPI(); // Fetch users when the component mounts
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
        {/* Display fetched users */}
        <div>
          <h2>Users List</h2>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index}>
                <p>Username: {user.username}</p>
                <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No users found.</p>
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
