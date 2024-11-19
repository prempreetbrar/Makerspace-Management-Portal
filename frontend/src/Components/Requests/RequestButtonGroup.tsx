import React from 'react';
import "../../styles/requests/RequestButtonGroup.css";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface ButtonGroupProps {
  value: string;
  onChange: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ value, onChange }) => {
  return (
    <div className="button-group-container">
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(event, newValue) => onChange(newValue)}
        className="button-group"
      >
        <ToggleButton value="approved" className="toggle-button">
          Approved
        </ToggleButton>
        <ToggleButton value="pending" className="toggle-button">
          Pending
        </ToggleButton>
        <ToggleButton value="rejected" className="toggle-button">
          Rejected
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ButtonGroup;
