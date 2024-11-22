import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabContainerProps {
    approvedCards: React.ReactNode[];
    pendingCards: React.ReactNode[];
    rejectedCards: React.ReactNode[];
}

const TabContainer: React.FC<TabContainerProps> = ({
    approvedCards,
    pendingCards,
    rejectedCards,
}) => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderCards = () => {
        switch (currentTab) {
            case 0:
                return approvedCards;
            case 1:
                return pendingCards;
            case 2:
                return rejectedCards;
            default:
                return null;
        }
    };

    return (
        <Box
            className="tab-container"
            sx={{
                margin: '50px 15px 0px 15px',
                marginBottom: '100px',
                backgroundColor: '#7D768B',
                padding: '0px 0px 20px 0px',
                borderRadius: '16px',
            }}
        >
            <Tabs
                value={currentTab}
                onChange={handleChange}
                className="tab-bar"
                sx={{
                    backgroundColor: '#b39ddb',
                    borderRadius: '16px 16px 0 0',
                    color: '#483E5C',
                    '& .MuiTabs-indicator': {
                        display: 'none',
                    },
                }}
                variant="fullWidth"
            >
                <Tab
                    label="Approved"
                    className="custom-tab"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&.Mui-selected': {
                            backgroundColor: '#D0BCFE',
                            color: 'white',
                        },
                    }}
                />
                <Tab
                    label="Pending"
                    className="custom-tab"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&.Mui-selected': {
                            backgroundColor: '#D0BCFE',
                            color: 'white',
                        },
                    }}
                />
                <Tab
                    label="Rejected"
                    className="custom-tab"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&.Mui-selected': {
                            backgroundColor: '#D0BCFE',
                            color: 'white',
                        },
                    }}
                />
            </Tabs>
            <Box
                className="tab-content"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {renderCards()}
            </Box>
        </Box>
    );
};

export default TabContainer;
