import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface NavbarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNavbar: React.FC<NavbarProps> = ({ selectedTab, onTabChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#65558F',
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
      }}
    >
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0',
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          style={{
            marginLeft: '20px',
          }}
        >
          Makerspace
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          style={{
            marginRight: '20px',
          }}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <Tabs
        variant="fullWidth"
        value={selectedTab}
        onChange={handleChange}
        centered
        style={{
          backgroundColor: '#65558F',
          width: '100%',
          margin: '0',
          padding: '0',
        }}
        TabIndicatorProps={{
          style: { backgroundColor: '#fff' }, // Indicator color
        }}
      >
        <Tab
          label="Reserve Equipment"
          value="reserve"
          style={{
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        />
        <Tab
          label="View Requests"
          value="requests"
          style={{
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        />
      </Tabs>
    </AppBar>
  );
};

export default MobileNavbar;
