import React from 'react';
import '../styles/authentication/credential_form.css';

const CredentialForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <form className="form">
      {children}
    </form>
  );
};

export default CredentialForm;