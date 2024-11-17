// This will probably need to take some props to change the displayed links depending on the page

import '../styles/navbar.css';
import LoginButton from './LoginButton';
import CreateAccountButton from './CreateAccountButton';
import { useNavigate } from 'react-router-dom';
import NavLogo from "../assets/logo_grayscale.svg";
import { useState } from 'react';
import LoginPopover from './LoginPopover.tsx';
import CreateAccountPopover from './CreateAccountPopover.tsx';


const NavBar = ({id}: { id: string }) => {


    const [anchorElLogin, setAnchorElLogin] = useState<HTMLElement | null>(null);
    const handleOpenLogin = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLogin(event.currentTarget);
        setAnchorElCreate(null); 
    };
    const handleCloseLogin = () => setAnchorElLogin(null);
    const openLogin = Boolean(anchorElLogin);

    const [anchorElCreate, setAnchorElCreate] = useState<HTMLElement | null>(null);
 const handleOpenCreateAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCreate(event.currentTarget);
    setAnchorElLogin(null); 
};
    const handleCloseCreateAccount = () => setAnchorElCreate(null);
    const openCreateAccount = Boolean(anchorElCreate);

   
    
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
              <img src={NavLogo} alt="React Logo" className="logo" />
              </div>
              <ul className="nav-links">
                  <li><a href="home">Home</a></li>
                  <li><a href="reserve">Reserve Equipment</a></li>
                  <li><a href="requests">View Requests</a></li>
              </ul>
            </div>
            <div className="auth-buttons">
                <LoginButton button_type='button' onClick={handleOpenLogin}></LoginButton>
                <CreateAccountButton button_type='button' onClick={handleOpenCreateAccount}></CreateAccountButton>
            </div>


            <LoginPopover 
                anchorEl={anchorElLogin}
                openLogin={openLogin}
                handleCloseLogin={handleCloseLogin}
            />



            <CreateAccountPopover 
            anchorEl={anchorElCreate}
            openCreateAccount={openCreateAccount}
            handleCloseCreateAccount={handleCloseCreateAccount} 
                />



        </nav>
    );
};

export default NavBar;