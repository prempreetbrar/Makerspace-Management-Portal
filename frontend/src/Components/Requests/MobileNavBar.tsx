import React, { useState } from 'react';
import '../../styles/requests/MobileNavBar.css';
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
    <AppBar position="static" className="mobile-navbar">
      <Toolbar className="mobile-navbar-toolbar">
        <Typography variant="h6" className="mobile-navbar-title">
          Makerspace
        </Typography>
        <IconButton edge="end" color="inherit" className="mobile-navbar-icon">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <Tabs
        variant="fullWidth"
        value={selectedTab}
        onChange={handleChange}
        centered
        className="navbar-tabs"
        TabIndicatorProps={{
          style: { backgroundColor: '#fff' }, // Indicator color
        }}
      >
        <Tab
          label="Reserve Equipment"
          value="reserve"
          className="mobile-navbar-tab"
        />
        <Tab
          label="View Requests"
          value="requests"
          className="mobile-navbar-tab"
        />
      </Tabs>
    </AppBar>
  );
};

export default MobileNavbar;
