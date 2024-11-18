import illustrationDesktop from '../assets/2.jpg';
import illustrationMobile from '../assets/mobile-landing-bg.svg';
import NavBar from '../Components/NavBar.tsx';
import MainContainer from '../Components/MainContainer.tsx';
import LoginButton from '../Components/LoginButton.tsx';
import CreateAccountButton from '../Components/CreateAccountButton.tsx';
import GetStartedButton from '../Components/GetStartedButton.tsx';
import { useNavigate } from 'react-router-dom';
import '../styles/landing/local.css';
import React, { useState } from 'react';
import Login from './Login.tsx';
import Signup from './Signup.tsx';
import MobileLogo from "../assets/logo_purple.svg";

const Landing = () => {
  const [isMobileLoginOpen, setIsMobileLoginOpen] = useState(false); 
  const handleOpenLoginMobile = () => setIsMobileLoginOpen(true);  
  const handleCloseLoginMobile = () => setIsMobileLoginOpen(false);  


  const [isMobileCreateAccountOpen, setIsMobileCreateAccountOpen] = useState(false);  
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
    <>
      <NavBar id='landing'></NavBar>
      <MainContainer>
        <div className="content">
          <div className="logo-container2">   <img src={MobileLogo} alt="React Logo" className="logo" /></div>
          <div className='text-container'>
            <div className="text-content">
              <h1 className="heading">  
                <span className="word opacity-1">DESIGN.</span>
                <span className="word opacity-2">DEVELOP.</span> 
                <span className="word opacity-3">DISCOVER.</span>
                <span className="word opacity-4">INSIDE THE MAKERSPACE</span> <br />
              </h1>
              <p className="subheading">Bring your ideas to life by reserving tools, equipment, and workspace today.</p>
              <GetStartedButton></GetStartedButton>
              <div className="auth-buttons2">
                <LoginButton button_type='button' onClick={handleOpenLoginMobile}></LoginButton>
                <br /><br />
                <CreateAccountButton button_type='button' onClick={handleOpenCreateAccountMobile}></CreateAccountButton>
              </div>
            </div>
          </div>
          <div className="illustration-container">
            <img src={illustrationDesktop} alt="Makerspace Illustration" className="illustration desktop" />
            <img src={illustrationMobile} alt="Makerspace Illustration" className="illustration mobile" />
          </div>
    
          {isMobileLoginOpen && ( <Login onClose={handleCloseLoginMobile} />)}
          {isMobileCreateAccountOpen && ( <Signup onClose={handleCloseCreateAccountMobile} /> )}
        </div>
    
      </MainContainer>
    </>
  );
};

export default Landing;
