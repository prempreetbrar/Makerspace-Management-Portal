import React, { useState } from "react";
import "../../styles/requests/TabContainer.css";
import { Tabs, Tab, Box } from "@mui/material";

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
    <Box className="tab-container">
      <Tabs value={currentTab} onChange={handleChange} className="tab-bar" variant="fullWidth">
        <Tab label="Approved" className="custom-tab" />
        <Tab label="Pending" className="custom-tab" />
        <Tab label="Rejected" className="custom-tab" />
      </Tabs>
      <Box className="tab-content">{renderCards()}</Box>
    </Box>
  );
};

export default TabContainer;
