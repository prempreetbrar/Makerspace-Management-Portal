// This component should probably be split into two but it works so we can leave it
import React from 'react';
import '../styles/login_button.css';
import {Button} from '@mui/material';

interface LoginButtonProps {
  id: string;
  text?: string;
  button_type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const LoginButton = ({ id, text, button_type, onClick }: LoginButtonProps) => {
  return (
    <Button id={id} variant="contained" type={button_type} onClick={button_type === 'submit' ? undefined : onClick}
    className="login-button" sx={{ backgroundColor: 'white', color: 'black', border: '1px solid #ddd', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', marginRight: '8px',
      textTransform: 'none',
      '&:hover': {
          backgroundColor: '#f1f1f1',
      },width: '100px', borderRadius: 2,
    }}
  >
      {text || 'Login'}
    </Button>
  );
};

export default LoginButton;