import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import "../styles/authentication/login/Login-mobile.css"; 

interface LoginProps {
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ className: 'dialog-paper' }}>
      <DialogTitle className="dialog-title">Login</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField  label="Email Address" type="email" fullWidth margin="normal" className="text-field" />
        <TextField label="Password" type="password" fullWidth margin="normal" className="text-field" />
      </DialogContent>
      <DialogActions className="button-container">
      <Button  className="loginbutton" sx={{backgroundColor: '#65558f' , color:'white' }}>Log In</Button>
        <Button onClick={onClose}  className="cancelbutton" sx={{ color:'#65558f' }}>Cancel</Button>

      </DialogActions>
    </Dialog>
  );
};

export default Login;