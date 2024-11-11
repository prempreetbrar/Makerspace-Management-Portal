//@ts-ignore react is unused
import React from 'react';
import '../styles/authentication/local.css';
import MainContainer from '../Components/MainContainer.tsx';
import CredentialForm from '../Components/CredentialForm.tsx';
import LoginButton from '../Components/LoginButton.tsx';

const Login = () => {
  return (
    <MainContainer>
      <div className="logo-container">✂️<h2>MAKERSPACE</h2></div>
      <CredentialForm>
        <h4 className="login-text">Log in</h4>
        <div className="input-field"><input type="email" id="email" placeholder="Email" /></div>
        <div className="input-field"><input type="password" id="password" placeholder="Password" /></div>
        <LoginButton button_type='submit'></LoginButton>
        <p><a href="/signup" className="signup-link">Create Account</a></p>
      </CredentialForm>
    </MainContainer>
  );
};

export default Login;
