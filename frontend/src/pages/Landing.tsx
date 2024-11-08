
//@ts-ignore react is unused
import React from 'react';
import '../styles/style.css';
import illustrationDesktop from '../assets/2.jpg';
import illustrationMobile from '../assets/1.png';
const Landing = () => {
  return (
    <div className='bg'>
      <div className="container">
        {/* Navbar */}
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
            <button className="login-button">Log In</button>
            <button className="create-account-button">Create Account</button>
          </div>
        </nav>


        <div className="content">
          <div className="logo-container2">
            ✂️ {/* Logo Icon */}
          </div>
          <div className="illustration-container">
            <img src={illustrationDesktop} alt="Makerspace Illustration" className="illustration desktop" />
            <img src={illustrationMobile} alt="Makerspace Illustration" className="illustration mobile" />
          </div>
          <div className="text-content">
            <h1 className="heading">DESIGN. DEVELOP. DISCOVER. INSIDE THE MAKERSPACE.</h1>

            <p className="subheading">Bring your ideas to life by reserving tools, equipment, and workspace today.</p>
            <button className="get-started-button">Get Started</button>

            <div className="auth-buttons2">
              <button className="login-button">Log In</button>
              <br />
              <br />
              <button className="create-account-button">Create Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
