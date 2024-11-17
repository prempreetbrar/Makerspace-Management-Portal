// This will probably need to take some props to change the displayed links depending on the page

import '../styles/navbar.css';
import LoginButton from './LoginButton';
import CreateAccountButton from './CreateAccountButton';
import { useNavigate } from 'react-router-dom';

const NavBar = ({id}: { id: string }) => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToSignUp = () => {
        navigate('/signup');
    };
    return (
        <nav className="navbar" id={id}>
            <div className='left'>
              <div className="logo-container">
                  ✂️ {/* Logo Icon  will replace here*/}
              </div>
              <ul className="nav-links">
                  <li><a href="home">Home</a></li>
                  <li><a href="reserve">Reserve Equipment</a></li>
                  <li><a href="requests">View Requests</a></li>
              </ul>
            </div>
            <div className="auth-buttons">
                <LoginButton button_type='button' onClick={goToLogin}></LoginButton>
                <CreateAccountButton button_type='button' onClick={goToSignUp}></CreateAccountButton>
            </div>
        </nav>
    );
};

export default NavBar;