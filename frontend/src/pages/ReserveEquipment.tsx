import React, { useState } from 'react';
import '../styles/reserve_equipment/local.css';
import PopupMenu from '../Components/PopupMenu';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ReserveEquipment = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="reserve-test-page">
      <button type='button' className="open-menu-button" onClick={togglePopup}>
        Open Menu
      </button>
      {isOpen &&
        <PopupMenu onClose={togglePopup}>
          <div className="calendar-container">
            <p>Calendar Placeholder</p>
          </div>
          <div className="time-slots">
            <p>Time Slots Placeholder</p>
            <p>Time Slots Placeholder</p>
          </div>
          <div className="reservation-form">
            <h2>Reserve Equipment</h2>
            <TextField label="Equipment Type" value="3D Printer" InputProps={{ readOnly: true }} />
            <TextField label="Date of Reservation" placeholder="00/00/0000" />
            <TextField label="First Name" placeholder="First Name" />
            <TextField label="Last Name" placeholder="Last Name" />
            <TextField label="Student Number" placeholder="12345678" />
            <label>Request Details</label>
            <textarea placeholder="Description"></textarea>
            <div className="buttons">
              <Button variant="contained" className="report-issue">Report Issue</Button>
              <Button variant="contained" className="submit-request">Submit Request</Button>
            </div>
          </div>
        </PopupMenu>}
    </div>
  );
};

export default ReserveEquipment;
