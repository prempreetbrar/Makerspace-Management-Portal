import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import "../styles/authentication/login/Login-mobile.css"; 

interface CreateAccountProps {
  onClose: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ className: 'dialog-paper' }}>
      <DialogTitle className="dialog-title">Create Account</DialogTitle>
      <DialogContent className="dialog-content">
      <TextField
 className="text-field"
          margin="normal"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
     

        />
        <TextField
        className="text-field"
          margin="normal"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"


        />
        <TextField
        className="text-field"
          margin="normal"
          label="Student Number"
          type="text"
          fullWidth
          variant="outlined"
          

        />
        <TextField
        className="text-field"
          margin="normal"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"


        />
        <TextField
        className="text-field"
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"


        />
        <TextField
        className="text-field"
          margin="normal"
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"


        />
      </DialogContent>
      <DialogActions className="button-container">
      <Button color="primary" className="sign-up-button">Sign Up</Button>
        <Button onClick={onClose} color="primary" className="cancel-button">Cancel</Button>

      </DialogActions>
    </Dialog>
  );
};

export default CreateAccount;
