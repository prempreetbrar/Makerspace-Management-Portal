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
      sx={{
        margin: '50px 200px 0px 200px',
        marginBottom: '100px',
        backgroundColor: '#7D768B',
        padding: '0px 0px 20px 0px',
        borderRadius: '16px',
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleChange}
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '20px',
          width: '100%',
        }}
      >
        {renderCards()}
      </Box>
    </Box>
  );
};

export default TabContainer;
