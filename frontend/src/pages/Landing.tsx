import '../styles/landing/local.css';
import illustrationDesktop from '../assets/2.jpg';
import illustrationMobile from '../assets/mobile-landing-bg.svg';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import LoginButton from '../Components/LoginButton.tsx';
import CreateAccountButton from '../Components/CreateAccountButton.tsx';
import GetStartedButton from '../Components/GetStartedButton.tsx';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Toolbar, Typography } from '@mui/material';
import Logobnw from "../assets/logo_grayscale.svg"
import React, { useState } from 'react';
import LoginPopover from '../Components/LoginPopover';
import CreateAccountPopover from '../Components/CreateAccountPopover';
import Login from './Login';
import CreateAccount from './Signup';

import Logo from "../assets/logo_purple.svg";

const Landing = () => {

    const [anchorElLogin, setAnchorElLogin] = useState<HTMLElement | null>(null);
    const [anchorElCreate, setAnchorElCreate] = useState<HTMLElement | null>(null);
    const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false); 
    const [isMobileCreateAccountOpen, setIsMobileCreateAccountOpen] = useState(false);  

    const handleOpenLogin = (event: React.MouseEvent<HTMLElement>) => setAnchorElLogin(event.currentTarget);
    const handleCloseLogin = () => setAnchorElLogin(null);
    const openLogin = Boolean(anchorElLogin);

    const handleOpenCreateAccount = (event: React.MouseEvent<HTMLElement>) => setAnchorElCreate(event.currentTarget);
    const handleCloseCreateAccount = () => setAnchorElCreate(null);
    const openCreateAccount = Boolean(anchorElCreate);

    const handleOpenLoginMobile = () => setIsMobileLoginOpen(true);  
    const handleCloseLoginMobile = () => setIsMobileLoginOpen(false);  

    const handleOpenCreateAccountMobile = () => setIsMobileCreateAccountOpen(true);  
    const handleCloseCreateAccountMobile = () => setIsMobileCreateAccountOpen(false); 





  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <MainContainer className="container">
        <Toolbar className="navbar">
                <div className="logo-container">
                    <img src={Logobnw} alt="React Logo" className="logo" />
                </div>
                <ul className="nav-links">
        <li><a href="home">Home</a></li>
        <li><a href="#reserve">Reserve Equipment</a></li>
        <li><a href="requests">View Requests</a></li>
      </ul>
                <div className="auth-buttons">
                    <Button variant="outlined" color="primary" className="login-button" onClick={handleOpenLogin}>Log In</Button>
                    <Button variant="contained" color="primary" className="create-account-button" onClick={handleOpenCreateAccount}>Create Account</Button>
                </div>
            </Toolbar>

    <Grid container spacing={4} className="content" alignItems="center">
                {/* <div className="logo-outlined">
                    <img src={Logo} alt="React Logo" className="logo" />
                </div> */}

   
        <div className="illustration-container">
          <img src={illustrationDesktop} alt="Makerspace Illustration" className="illustration desktop" />
          <img src={illustrationMobile} alt="Makerspace Illustration" className="illustration mobile" />
        </div>
        <div className='text-container'>
        <Grid item xs={12} md={6} className="text-content">
            <Typography variant="h3" component="h1" gutterBottom className="heading">
                        <span className="design line">DESIGN.</span>
                        <span className="develop line">DEVELOP.</span>
                        <span className="discover line">DISCOVER.</span>
                        <span className="inside line">INSIDE THE MAKERSPACE.</span>
            </Typography>
            <Typography variant="h5" component="h1" gutterBottom className="heading2">
                        DESIGN. DEVELOP. DISCOVER. INSIDE THE MAKERSPACE.
                    </Typography>


            <p className="subheading">Bring your ideas to life by reserving tools, equipment, and workspace today.</p>
            <GetStartedButton></GetStartedButton>
            <div className="auth-buttons-mobile">
                        <Button variant="contained" color="primary" className="login-button-mobile" onClick={handleOpenLoginMobile}>Log In</Button>
                        <Button variant="contained" color="primary" className="create-account-button-mobile" onClick={handleOpenCreateAccountMobile}>Create Account</Button>
                    </div>

                    </Grid>
        </div>
        {isMobileLoginOpen && ( <Login onClose={handleCloseLoginMobile} />)}
            {isMobileCreateAccountOpen && ( <CreateAccount onClose={handleCloseCreateAccountMobile} /> )}

     
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



    </Grid>
    </MainContainer>
  );
};

export default Landing;
