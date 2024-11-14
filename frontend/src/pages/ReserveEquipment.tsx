import React, { useState } from 'react';
import '../styles/reserve_equipment/local.css';
import ReservePopup from '../Components/ReservePopup';

const ReserveTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="reserve-test-page">
      <button type='button' className="open-menu-button" onClick={togglePopup}>
        Open Menu
      </button>
      {isOpen && <ReservePopup onClose={togglePopup} />}
    </div>
  );
};

export default ReserveTest;
