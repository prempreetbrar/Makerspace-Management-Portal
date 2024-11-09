
//@ts-ignore react is unused
import React, { useState } from "react";

import '../styles/style.css';
import '../styles/authentication/local.css';
import MainContainer from '../Components/MainContainer.tsx';
import CredentialForm from '../Components/CredentialForm.tsx';

const Signup = () => {
  return (
    <MainContainer>
      <div className="logo-container">✂️<h2>MAKERSPACE</h2></div>
      <CredentialForm>
        <h4 className="login-text">Create Account</h4>
        <div className="input-field"><input type="email" id="email" placeholder="Email" /></div>
        <div className="input-field"><input type="password" id="password" placeholder="Password" /></div>
        <div className="input-field"><input type="password" id="password" placeholder="Confirm Password" /></div>
        <button type="submit" className="login-button">Log in</button>
        <p>Already have an account?<a href="/login" className="login-link">Log</a></p>
      </CredentialForm>
    </MainContainer>
  );
};

export default Signup;