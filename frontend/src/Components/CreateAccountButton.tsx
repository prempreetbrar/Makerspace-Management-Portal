import React from 'react';
import '../styles/create_account_button.css';
import {Button} from '@mui/material';

interface CreateAccountButtonProps {
  id: string;
  button_type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick: (event:React.MouseEvent<HTMLElement>) => void;
}

const CreateAccountButton = ({ id, button_type, onClick }: CreateAccountButtonProps) => {
  return (
    <Button type={button_type} className="create-account-button" id={id} onClick={button_type === 'submit' ? undefined : onClick}sx={{ backgroundColor: 'black', color: 'white', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4)', textTransform: 'none',
    '&:hover': {
        backgroundColor: '#333',
    }, width: '120px', borderRadius: 2,
  }}>Create Account</Button>
  );
};

export default CreateAccountButton;
