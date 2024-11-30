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
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        onTabChange(newValue);
    };

    return (
        <AppBar
            position="static"
            className="mobile-navbar"
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
                className="mobile-navbar-toolbar"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0',
                    width: '100%',
                }}
            >
                <Typography
                    variant="h6"
                    className="mobile-navbar-title"
                    style={{
                        marginLeft: '20px',
                    }}
                >
                    Makerspace
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    className="mobile-navbar-icon"
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
                className="navbar-tabs"
                style={{
                    backgroundColor: '#65558F',
                    width: '100%',
                    margin: '0',
                    padding: '0',
                }}
                TabIndicatorProps={{
                    style: { backgroundColor: '#fff' },
                }}
            >
                <Tab
                    label="Reserve Equipment"
                    value="reserve"
                    className="mobile-navbar-tab"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                />
                <Tab
                    label="View Requests"
                    value="requests"
                    className="mobile-navbar-tab"
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
