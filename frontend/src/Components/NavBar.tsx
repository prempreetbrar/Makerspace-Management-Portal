// This will probably need to take some props to change the displayed linked depending on the page

import '../styles/navbar.css';
import LoginButton from './LoginButton';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        ✂️ {/* Logo Icon  will replace here*/}
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#reserve">Reserve Equipment</a></li>
        <li><a href="#requests">View Requests</a></li>
      </ul>
      <div className="auth-buttons">
        <LoginButton button_type='button'></LoginButton>
        <button className="create-account-button">Create Account</button>
      </div>
    </nav>
  );
};

export default NavBar;