import React, { useState } from "react";

import './style.css';

const Signup = () => {
  

  return (
    <div className="container">
    <div className="logo-container">
    ✂️
      <h2>MAKERSPACE</h2>
    </div>

    <form className="form">
      <h4 className="login-text">Create Account</h4>
      <div className="input-field">
    
        <input type="email" id="email" placeholder="Email" />
      </div>
      <div className="input-field">
  
        <input type="password" id="password" placeholder="Password" />
      </div>

      <div className="input-field">
  
  <input type="password" id="password" placeholder="Confirm Password" />
</div>
      <button type="submit" className="login-button">
        Log in
      </button>
      <p>
    Already have an account? 
        <a href="/login" className="login-link">
          Log
        </a>
      </p>
    </form>
  </div>
  );
};

export default Signup;