
//@ts-ignore react is unused
import React, { useState } from "react";

import '../styles/authentication/local.css';
import MainContainer from '../Components/MainContainer.tsx';
import CredentialForm from '../Components/CredentialForm.tsx';
import LoginButton from "../Components/LoginButton.tsx";

const Signup = () => {
  return (
    <MainContainer>
      <div className="logo-container">✂️<h2>MAKERSPACE</h2></div>
      <CredentialForm>
        <h4 className="login-text">Create Account</h4>
        <div className="input-field"><input type="email" id="email" placeholder="Email" /></div>
        <div className="input-field"><input type="password" id="password" placeholder="Password" /></div>
        <div className="input-field"><input type="password" id="password" placeholder="Confirm Password" /></div>
        <LoginButton button_type='button'></LoginButton>
        <p>Already have an account?<a href="/login" className="login-link">Log</a></p>
      </CredentialForm>
    </MainContainer>
  );
};

export default Signup;