import React from 'react';
import '../styles/get_started_button.css';
import {Button} from '@mui/material';
interface GetStartedButtonProps
{
    onClick: ()=>void
}
const GetStartedButton = ({onClick}:GetStartedButtonProps) => {
  return (
    <Button className="get-started-button" onClick={onClick} sx={{ backgroundColor: 'white', color: 'black', border: '1px solid #ddd', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', marginRight: '8px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#f1f1f1',
    },width: '100px', borderRadius: 2,display: 'none',
    '@media (min-width: 769px)': {
      display: 'inline-block',
    },
  }}>Get Started</Button>
  );
};

export default GetStartedButton;