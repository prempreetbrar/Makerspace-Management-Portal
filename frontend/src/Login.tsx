//@ts-ignore react is unused
import React from 'react';
import './style.css';

const Login = () => {
  return (
    <div className="container">
      <div className="logo-container">
      ✂️
        <h2>MAKERSPACE</h2>
      </div>

      <form className="form">
        <h4 className="login-text">Log in</h4>
        <div className="input-field">
      
          <input type="email" id="email" placeholder="Email" />
        </div>
        <div className="input-field">
    
          <input type="password" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="login-button">
          Log in
        </button>
        <p>
      
          <a href="/signup" className="signup-link">
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
