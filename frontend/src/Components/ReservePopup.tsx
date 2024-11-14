import React from 'react';
import '../styles/reserve_equipment/reserve_popup.css';

interface ReservePopupProps {
  onClose: () => void;
}

const ReservePopup: React.FC<ReservePopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="calendar-container">
          <p>Calendar Placeholder</p>
        </div>
        <div className="time-slots">
          <p>Time Slots Placeholder</p>
          <p>Time Slots Placeholder</p>
        </div>
        <div className="reservation-form">
          <h2>Reserve Equipment</h2>
          <label>Equipment Type</label>
          <input type="text" value="3D Printer" readOnly />
          <label>Date of Reservation</label>
          <input type="text" placeholder="00/00/0000" />
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />
          <label>Student Number</label>
          <input type="text" placeholder="12345678" />
          <label>Request Details</label>
          <textarea placeholder="Description"></textarea>
          <div className="buttons">
            <button type="button" className="report-issue">Report Issue</button>
            <button type="button" className="submit-request">Submit Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservePopup;
